import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// Update the import path to match the actual file name, e.g., 'signupPage' or 'SignUpPage'
import { SignUpPage } from '../page-objects/signup-page.pom';
import { CustomWorld } from '../support/world';

function ensureSignUpPage(world: CustomWorld) {
    if (!world.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    return world.signUpPage;
}

Given('the user is on the signup page', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Playwright page not initialized. Check your hooks and World setup.');
    }
    this.signUpPage = new SignUpPage(this.page);
    await this.signUpPage.goto();
    await this.captureScreenshot('signup-page');
});

When('the user provides their full name {string}', async function (this: CustomWorld, fullName: string) {
    const signUpPage = ensureSignUpPage(this);
    await signUpPage.signUpField.fill(fullName);
});

// This step works for both When and And keywords
When('the user submits the petition', async function (this: CustomWorld) {
    const signUpPage = ensureSignUpPage(this);
    await signUpPage.signUpButtonLocator.click();
});

When('the user presses the Tab key', async function (this: CustomWorld) {
    const signUpPage = ensureSignUpPage(this);
    await signUpPage.pressTab();
});

When('the user presses the Enter key', async function (this: CustomWorld) {
    const signUpPage = ensureSignUpPage(this);
    await signUpPage.pressEnter();
});

Then('the user should see their name {string} on the petition page', async function (this: CustomWorld, fullName: string) {
    const signUpPage = ensureSignUpPage(this);
    const nameLocator = signUpPage.getNameInPetitionContainer(fullName);
    await expect(nameLocator).toBeVisible();
    await this.captureScreenshot('petition-signed');
});

Then('the user should see their name {string} on the petition page visually', async function (this: CustomWorld, expectedName: string) {
  console.log(`[test] visual step start for: ${expectedName}`);
  const signUp = ensureSignUpPage(this);

  // debug: ensure locator exists
  console.log('[test] petitionNameLocator selector:', signUp.petitionNameLocator && (await signUp.petitionNameLocator.evaluate((el: any) => el.outerHTML).catch(() => 'not-evaluatable')));

  // wait/assert text then run visual assertion
  await signUp.petitionNameLocator.waitFor({ state: 'visible', timeout: 15000 });
  await expect(signUp.petitionNameLocator).toHaveText(expectedName, { timeout: 15000 });

  console.log('[test] about to call assertNameVisual');
  await signUp.assertNameVisual(expectedName);
  console.log('[test] assertNameVisual returned');

  // attach current image for visibility in report
  const img = await signUp.petitionNameLocator.screenshot();
  if (this.attach) this.attach(img, 'image/png');
});
