import type { Page, Locator } from "playwright";
import { visualRegression } from "../support/visual-regression";
import { expect } from "@playwright/test";

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

  // capture full page baseline/compare
  async assertVisualSnapshot(name: string) {
    const result = await visualRegression.comparePage(
      this.page,
      `signup-${name}`,
      { fullPage: true }
    );
    if (!result.passed) {
      // You can throw to fail the step, or attach links to diff in report
      throw new Error(`Visual mismatch for ${name}. Diff: ${result.diffPath}`);
    }
  }

  // capture just the name element
  async assertNameVisual(expectedName: string) {
    console.log(`[visual] assertNameVisual start for: ${expectedName}`);
    await this.petitionNameLocator.waitFor({ state: "visible", timeout: 15000 });
    await expect(this.petitionNameLocator).toHaveText(expectedName, {
      timeout: 15000,
    });

    const safe = this.safeNameForFile(expectedName);
    console.log(`[visual] taking screenshot for safe name: ${safe}`);
    const buf = await this.petitionNameLocator.screenshot();
    console.log("[visual] screenshot taken, size:", buf.length);

    const result = await visualRegression.compareBuffer(buf, `signup-name-${safe}`);
    console.log("[visual] compare result:", result);

    if (!result.passed) {
      console.error("[visual] mismatch, diffPath:", result.diffPath);
      throw new Error(
        `Visual mismatch for "${expectedName}". Diff: ${result.diffPath || "none"}`
      );
    }
    console.log("[visual] visual match OK");
  }

  /**
   * Returns a locator for the user's name within the petition container.
   * @param fullName The full name to search for
   */
  getNameInPetitionContainer(fullName: string): Locator {
    const container = this.page.locator("div.max-h-96.overflow-y-auto");
    return container.locator(
      `span.text-gray-900.font-medium.text-lg:has-text(\"${fullName}\")`
    );
  }

  async pressTab() {
    await this.page.keyboard.press("Tab");
  }

  async pressEnter() {
    await this.page.keyboard.press("Enter");
  }
}
