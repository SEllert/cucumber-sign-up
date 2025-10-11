import { visualRegression, CompareResult } from '../support/visual-regression';
import { expect } from '@playwright/test';
import type { Page, Locator } from 'playwright';
import { stabilizePage } from '../support/visual-helpers';

export class SignUpPage {
  readonly page: Page;
  readonly signUpField: Locator;
  readonly signUpButtonLocator: Locator;
  readonly petitionNameLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpField = page.locator('input[id="fullName"]');
    this.signUpButtonLocator = page.locator('button[type="submit"]');
    this.petitionNameLocator = page.locator('//*[@id="root"]/div/div/div[4]/div[2]/div/div/span'); // ensure selector is correct
  }

  private safeNameForFile(name: string) {
    return encodeURIComponent(name).replace(/%/g, "_").slice(0, 200);
  }

  async goto() {
    await this.page.goto("https://gleeful-smakager-dc1a05.netlify.app/");
  }

  // capture just the name element
  async assertNameVisual(expectedName: string): Promise<CompareResult> {
    await stabilizePage(this.page);
    await this.petitionNameLocator.waitFor({ state: "visible", timeout: 15000 });
    await expect(this.petitionNameLocator).toHaveText(expectedName, {
      timeout: 15000,
    });

    const safe = this.safeNameForFile(expectedName);
    const buf = await this.petitionNameLocator.screenshot();
    const result = await visualRegression.compareBuffer(buf, `signup-name-${safe}`);
    return result;
  }

  // capture full page baseline/compare
  async assertVisualSnapshot(name: string, options?: { fullPage?: boolean }): Promise<CompareResult> {
    const result = await visualRegression.comparePage(
      this.page,
      name,
      { fullPage: !!options?.fullPage }
    );
    return result;
  }

  /**
   * Returns a locator for the user's name within the petition container.
   * @param fullName The full name to search for
   */
  getNameInPetitionContainer(fullName: string): Locator {
    const container = this.page.locator("div.max-h-96.overflow-y-auto");
    return container.locator(
      `span.text-gray-900.font-medium.text-lg:has-text("${fullName}")`
    );
  }

  async pressTab() {
    await this.page.keyboard.press("Tab");
  }

  async pressEnter() {
    await this.page.keyboard.press("Enter");
  }
}
