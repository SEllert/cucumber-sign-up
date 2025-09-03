import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit, BrowserType } from 'playwright';
import type { SignUpPage } from '../page-objects/signup-page.pom';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  signUpPage?: SignUpPage;

  async initBrowser() {
    const browserName = (process.env.BROWSER || 'chromium').toLowerCase();
    const headless = process.env.HEADLESS !== 'false'; // set HEADLESS=false to run headed
    const slowMo = process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : undefined;
    const devtools = process.env.DEVTOOLS === 'true';

    let browserType: BrowserType;
    switch (browserName) {
      case 'firefox':
        browserType = firefox;
        console.log('Using Firefox browser');
        break;
      case 'webkit':
        browserType = webkit;
        console.log('Using WebKit browser');
        break;
      default:
        browserType = chromium;
        console.log('Using Chromium browser');
    }

    this.browser = await browserType.launch({ headless, slowMo, devtools });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    console.log(`Launched ${browserName} (headless=${headless}, slowMo=${slowMo ?? 0}, devtools=${devtools})`);
  }

  async closeBrowser() {
    try {
      if (this.page && !this.page.isClosed()) await this.page.close();
    } catch (e) { /* ignore */ }
    try {
      if (this.context) await this.context.close();
    } catch (e) { /* ignore */ }
    try {
      if (this.browser) await this.browser.close();
    } catch (e) { /* ignore */ }
  }

  async captureScreenshot(name?: string) {
    if (!this.page) throw new Error('Page not initialized');
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
    if (name) this.log(`Screenshot captured: ${name}`);
  }
}

setWorldConstructor(CustomWorld);

console.log('ENV HEADLESS:', process.env.HEADLESS, 'BROWSER:', process.env.BROWSER, 'SLOWMO:', process.env.SLOWMO);
