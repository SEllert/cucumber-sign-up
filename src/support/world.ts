import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import type { SignUpPage } from '../page-objects/signup-page.pom';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  
  // Add signUpPage property for use in step definitions
  signUpPage?: import('../page-objects/signup-page.pom').SignUpPage;

  async initBrowser() {
    console.log('initBrowser called')
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.page.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
