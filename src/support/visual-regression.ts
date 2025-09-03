import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import type { Page, Locator } from 'playwright';

export type CompareResult = {
  passed: boolean;
  diffPath?: string;
  baselineCreated?: boolean;
  updatedBaseline?: boolean;
  diffPixels?: number;
};

export class VisualRegression {
  baselineDir: string;
  diffDir: string;
  // allowed fraction of differing pixels (was called threshold previously)
  allowedDiffRatio: number;
  update: boolean;
  // options forwarded to pixelmatch
  pixelmatchOptions: {
    threshold: number;
    includeAA?: boolean;
    alpha?: number;
  };

  constructor(options?: Partial<{ baselineDir: string; diffDir: string; allowedDiffRatio: number; update: boolean; pixelmatchOptions: any }>) {
    this.baselineDir = (options && options.baselineDir) || path.resolve(process.cwd(), 'reports', 'visual-baseline');
    this.diffDir = (options && options.diffDir) || path.resolve(process.cwd(), 'reports', 'visual-diff');

    // make comparison less sensitive by default: 1% differing pixels allowed
    this.allowedDiffRatio = (options && options.allowedDiffRatio) ?? 0.01; // 1% default (increase to 0.02 for 2%)
    this.update = (options && options.update) ?? !!process.env.UPDATE_SNAPSHOTS;

    // pixelmatch options: increase threshold and ignore anti-aliasing
    this.pixelmatchOptions = (options && options.pixelmatchOptions) ?? {
      threshold: 0.12,   // pixelmatch sensitivity (0..1). higher is more tolerant
      includeAA: true,   // try to ignore anti-aliased pixels
      alpha: 0.1
    };

    if (!fs.existsSync(this.baselineDir)) fs.mkdirSync(this.baselineDir, { recursive: true });
    if (!fs.existsSync(this.diffDir)) fs.mkdirSync(this.diffDir, { recursive: true });

    console.log(`[visual] init: baselineDir=${this.baselineDir}, diffDir=${this.diffDir}, allowedDiffRatio=${this.allowedDiffRatio}, update=${this.update}`);
    console.log('[visual] pixelmatchOptions:', this.pixelmatchOptions);
  }

  private async bufferToPng(buf: Buffer): Promise<PNG> {
    return PNG.sync.read(buf);
  }

  private writePng(png: PNG, dest: string) {
    fs.writeFileSync(dest, PNG.sync.write(png));
  }

  private safeName(name: string) {
    return encodeURIComponent(name).replace(/%/g, '_').slice(0, 250);
  }

  private browserPrefix() {
    // read env var or default; sanitize to filesystem-safe chars
    const b = (process.env.BROWSER || 'chromium').toString().toLowerCase();
    return b.replace(/[^a-z0-9-_]/g, '');
  }

  private makePaths(rawName: string) {
    const name = this.safeName(rawName);
    const browser = this.browserPrefix();
    const baseName = `${browser}__${name}`;
    return {
      baseline: path.join(this.baselineDir, `${baseName}.png`),
      current: path.join(this.diffDir, `${baseName}.current.png`),
      diff: path.join(this.diffDir, `${baseName}.diff.png`),
      safeName: baseName
    };
  }

  // Compare a screenshot buffer to baseline
  async compareBuffer(buf: Buffer, rawName: string): Promise<CompareResult> {
    const { baseline, current, diff, safeName } = this.makePaths(rawName);

    console.log(`[visual] compare start: ${rawName} -> ${safeName}`);
    console.log(`[visual] update flag: ${this.update}`);
    const baselineExistsBefore = fs.existsSync(baseline);
    console.log(`[visual] baseline exists before: ${baselineExistsBefore}`);
    console.log(`[visual] baseline path: ${baseline}`);

    const currentPng = await this.bufferToPng(buf);

    // write baseline if requested or missing
    if (this.update || !baselineExistsBefore) {
      try {
        this.writePng(currentPng, baseline);
        const baselineExistsAfter = fs.existsSync(baseline);
        console.log(`[visual] wrote baseline: ${baseline} (exists after write: ${baselineExistsAfter})`);
        return { passed: true, baselineCreated: !baselineExistsBefore, updatedBaseline: this.update };
      } catch (err) {
        console.error(`[visual] failed to write baseline ${baseline}:`, err);
        throw err;
      }
    }

    // baseline exists - compare
    let baselineBuf: Buffer;
    try {
      baselineBuf = fs.readFileSync(baseline);
    } catch (err) {
      console.error(`[visual] failed to read baseline ${baseline}:`, err);
      throw err;
    }
    const baselinePng = await this.bufferToPng(baselineBuf);

    // ensure same size: pad canvases if needed
    const w = Math.max(baselinePng.width, currentPng.width);
    const h = Math.max(baselinePng.height, currentPng.height);
    const baseCanvas = new PNG({ width: w, height: h });
    PNG.bitblt(baselinePng, baseCanvas, 0, 0, baselinePng.width, baselinePng.height, 0, 0);
    const currCanvas = new PNG({ width: w, height: h });
    PNG.bitblt(currentPng, currCanvas, 0, 0, currentPng.width, currentPng.height, 0, 0);
    const diffPng = new PNG({ width: w, height: h });

    const diffPixels = pixelmatch(baseCanvas.data, currCanvas.data, diffPng.data, w, h, this.pixelmatchOptions);
    console.log(`[visual] diff pixels: ${diffPixels} / ${w * h} (ratio ${(diffPixels / (w * h)).toFixed(6)})`);

    const diffRatio = diffPixels / (w * h);
    if (diffRatio > this.allowedDiffRatio) {
      try {
        this.writePng(currCanvas, current);
        this.writePng(diffPng, diff);
        console.log(`[visual] mismatch: wrote current -> ${current}, diff -> ${diff}`);
        return { passed: false, diffPath: diff, diffPixels };
      } catch (err) {
        console.error('[visual] failed writing current/diff images:', err);
        throw err;
      }
    }

    console.log('[visual] images matched within allowedDiffRatio');
    return { passed: true };
  }

  // Capture full page and compare
  async comparePage(page: Page, name: string, options?: { fullPage?: boolean }): Promise<CompareResult> {
    const buf = await page.screenshot({ fullPage: !!options?.fullPage });
    return this.compareBuffer(buf, name);
  }

  // Capture a specific element (locator) and compare
  async compareElement(locator: Locator, name: string): Promise<CompareResult> {
    const buf = await locator.screenshot();
    return this.compareBuffer(buf, name);
  }
}

// export a singleton for convenience
export const visualRegression = new VisualRegression({
  baselineDir: path.resolve(process.cwd(), 'reports', 'visual-baseline'),
  diffDir: path.resolve(process.cwd(), 'reports', 'visual-diff'),
  allowedDiffRatio: 0.01, // 1% default; raise if too strict
  update: !!process.env.UPDATE_SNAPSHOTS,
  pixelmatchOptions: { threshold: 0.12, includeAA: true, alpha: 0.1 }
});