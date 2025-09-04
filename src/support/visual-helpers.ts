import type { Page } from 'playwright';

export async function stabilizePage(page: Page) {
  // disable animations/transitions
  await page.addStyleTag({
    content: `
      *, *::before, *::after { transition: none !important; animation: none !important; }
      html, body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    `
  });
  // wait for fonts to load and network to be idle
  try { await page.evaluate(() => (document as any).fonts?.ready); } catch { /* ignore */ }
  await page.waitForLoadState('networkidle');
}