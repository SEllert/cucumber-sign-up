import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SignUpPage } from '../page-objects/signup-page.pom';
import { CustomWorld } from '../support/world';


Given('the user is on the signup page', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Playwright page not initialized. Check your hooks and World setup.');
    }
    this.signUpPage = new SignUpPage(this.page);
    await this.signUpPage.goto();
    await this.captureScreenshot('signup-page');
});

When('the user provides their full name {string}', async function (this: CustomWorld, fullName: string) {
    // Access signUpPage through the world instance
    if (!this.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    await this.signUpPage.signUpField.fill(fullName);
});

// This step works for both When and And keywords
When('the user submits the petition', async function (this: CustomWorld) {
    if (!this.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    await this.signUpPage.signUpButtonLocator.click();
});

When('the user presses the Tab key', async function (this: CustomWorld) {
    if (!this.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    await this.signUpPage.pressTab();
});

When('the user presses the Enter key', async function (this: CustomWorld) {
    if (!this.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    await this.signUpPage.pressEnter();
});

Then('the user should see their name {string} on the petition page', async function (this: CustomWorld, fullName: string) {
    if (!this.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    const nameLocator = this.signUpPage.getNameInPetitionContainer(fullName);
    await expect(nameLocator).toBeVisible();
    await this.captureScreenshot('petition-signed');
});