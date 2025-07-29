import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, chromium, firefox, webkit, BrowserType } from 'playwright';
import type { SignUpPage } from '../page-objects/signup-page.pom';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  
  // Add signUpPage property for use in step definitions
  signUpPage?: import('../page-objects/signup-page.pom').SignUpPage;

  async initBrowser() {
    // Get browser from environment variable or default to chromium
    const browserName = process.env.BROWSER?.toLowerCase() || 'chromium';
    
    // Select browser based on name
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
    
    this.browser = await browserType.launch();
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.page.close();
    await this.browser.close();
  }

  async captureScreenshot(name?: string) {
    if (!this.page) {
      throw new Error('Page not initialized');
    }
    
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
    
    if (name) {
      // You can add metadata or custom naming
      this.log(`Screenshot captured: ${name}`);
    }
  }
}

setWorldConstructor(CustomWorld);
