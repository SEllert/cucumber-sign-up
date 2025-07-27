import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../../browswerSetup';
import { SignUpPage } from '../page-objects/signup-page.pom';
import { CustomWorld } from '../support/world';

// No more global variable! 🎉
// let signUpPage: SignUpPage;  // ❌ Removed global state

Given('the user is on the signup page', async function (this: CustomWorld) {
    // 'this' refers to the CustomWorld instance for this scenario
    this.signUpPage = new SignUpPage(page);
    await this.signUpPage.goto();
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
});

When('the user provides their full name {string}', async function (this: CustomWorld, fullName: string) {
    // Access signUpPage through the world instance
    if (!this.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    await this.signUpPage.signUpField.fill(fullName);
});

// This step works for both When and And keywords
When('the user presses the Sign the Petition button', async function (this: CustomWorld) {
    if (!this.signUpPage) {
        throw new Error('SignUpPage not initialized. Make sure "Given the user is on the signup page" step runs first.');
    }
    await this.signUpPage.signUpButtonLocator.click();
});

When('the user presses the Tab key', async () => {
    await page.keyboard.press('Tab');
});

When('the user presses the Enter key', async () => {
    await page.keyboard.press('Enter');
}); 

Then('the user should see their name {string} on the petition page', async function (this: CustomWorld, fullName: string) {
    const html = await page.content();
    expect(html).toContain(fullName);
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
});