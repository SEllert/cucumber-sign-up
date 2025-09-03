import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// Update the import path to match the actual file name, e.g., 'signupPage' or 'SignUpPage'
import { SignUpPage } from '../page-objects/signup-page.pom';
import { CustomWorld } from '../support/world';
import fs from 'fs';
import path from 'path';

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

Given('the user is on the signup page at viewport {int}x{int}', async function (this: CustomWorld, width: number, height: number) {
    if (!this.page) throw new Error('Playwright page not initialized. Check your hooks and World setup.');
    // set viewport before navigation
    await this.page.setViewportSize({ width, height });
    this.signUpPage = new SignUpPage(this.page);
    await this.signUpPage.goto();
    await this.captureScreenshot(`signup-page-${width}x${height}`);
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

When('the user submits the petition without filling required fields', async function (this: CustomWorld) {
    if (!this.signUpPage) {
        if (!this.page) throw new Error('Playwright page not initialized. Check your hooks and World setup.');
        this.signUpPage = new SignUpPage(this.page);
        await this.signUpPage.goto();
    }
    // click submit directly
    await this.signUpPage.signUpButtonLocator.click();
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

  await signUp.petitionNameLocator.waitFor({ state: 'visible', timeout: 15000 });
  await expect(signUp.petitionNameLocator).toHaveText(expectedName, { timeout: 15000 });

  console.log('[test] about to call assertNameVisual');
  const result = await signUp.assertNameVisual(expectedName);
  console.log('[test] assertNameVisual returned', result);

  // Attach relevant images to Cucumber report (baseline/current/diff)
  // attach baseline if exists (useful when baseline created or for reference)
  if (result.baselinePath && fs.existsSync(result.baselinePath)) {
    const baselineBuf = fs.readFileSync(result.baselinePath);
    if (this.attach) this.attach(baselineBuf, 'image/png');
  }
  if (result.currentPath && fs.existsSync(result.currentPath)) {
    const currentBuf = fs.readFileSync(result.currentPath);
    if (this.attach) this.attach(currentBuf, 'image/png');
  }
  if (result.diffPath && fs.existsSync(result.diffPath)) {
    const diffBuf = fs.readFileSync(result.diffPath);
    if (this.attach) this.attach(diffBuf, 'image/png');
  }

  if (!result.passed) {
    throw new Error(`Visual mismatch for "${expectedName}". Diff: ${result.diffPath || 'none'}`);
  }
});

// Full-page visual step attachments
Then('the page should match the full-page visual baseline', async function (this: CustomWorld) {
  const signUp = ensureSignUpPage(this);
  const snapshotName = `fullpage_${Date.now()}`;
  const result = await signUp.assertVisualSnapshot(snapshotName, { fullPage: true });

  if (result.baselinePath && fs.existsSync(result.baselinePath)) {
    const baselineBuf = fs.readFileSync(result.baselinePath);
    if (this.attach) this.attach(baselineBuf, 'image/png');
  }
  if (result.currentPath && fs.existsSync(result.currentPath)) {
    const currentBuf = fs.readFileSync(result.currentPath);
    if (this.attach) this.attach(currentBuf, 'image/png');
  }
  if (result.diffPath && fs.existsSync(result.diffPath)) {
    const diffBuf = fs.readFileSync(result.diffPath);
    if (this.attach) this.attach(diffBuf, 'image/png');
  }

  if (!result.passed) {
    throw new Error(`Full-page visual mismatch. Diff: ${result.diffPath || 'none'}`);
  }
});

// Do same attachment pattern for validation/mobile steps
Then('the page should match the validation visual baseline', async function (this: CustomWorld) {
  const signUp = ensureSignUpPage(this);
  const snapshotName = `validation_${Date.now()}`;
  console.log('[visual] running validation visual check:', snapshotName);
  const result = await signUp.assertVisualSnapshot(snapshotName);

  if (result.baselinePath && fs.existsSync(result.baselinePath)) {
    const baselineBuf = fs.readFileSync(result.baselinePath);
    if (this.attach) this.attach(baselineBuf, 'image/png');
  }
  if (result.currentPath && fs.existsSync(result.currentPath)) {
    const currentBuf = fs.readFileSync(result.currentPath);
    if (this.attach) this.attach(currentBuf, 'image/png');
  }
  if (result.diffPath && fs.existsSync(result.diffPath)) {
    const diffBuf = fs.readFileSync(result.diffPath);
    if (this.attach) this.attach(diffBuf, 'image/png');
  }

  if (!result.passed) {
    throw new Error(`Validation visual mismatch. Diff: ${result.diffPath || 'none'}`);
  }
});

Then('the page should match the mobile visual baseline', async function (this: CustomWorld) {
  const signUp = ensureSignUpPage(this);
  const snapshotName = `mobile_${Date.now()}`;
  console.log('[visual] running mobile visual check:', snapshotName);
  const result = await signUp.assertVisualSnapshot(snapshotName);

  if (result.baselinePath && fs.existsSync(result.baselinePath)) {
    const baselineBuf = fs.readFileSync(result.baselinePath);
    if (this.attach) this.attach(baselineBuf, 'image/png');
  }
  if (result.currentPath && fs.existsSync(result.currentPath)) {
    const currentBuf = fs.readFileSync(result.currentPath);
    if (this.attach) this.attach(currentBuf, 'image/png');
  }
  if (result.diffPath && fs.existsSync(result.diffPath)) {
    const diffBuf = fs.readFileSync(result.diffPath);
    if (this.attach) this.attach(diffBuf, 'image/png');
  }

  if (!result.passed) {
    throw new Error(`Mobile visual mismatch. Diff: ${result.diffPath || 'none'}`);
  }
});
