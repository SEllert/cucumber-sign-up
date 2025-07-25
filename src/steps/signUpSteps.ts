import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../../browswerSetup';
import { SignUpPage } from '../page-objects/signup-page.pom';

let signUpPage: SignUpPage;

Given('the user is on the signup page', async function () {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
});

When('the user enters a Full name {string} into the Full name field', async (fullName: string) => {
    await signUpPage.signUpField.fill(fullName);
});

When('the user presses the Sign the Petition button', async () => {
    await signUpPage.signUpButtonLocator.click();
});

When('the user presses the Tab key', async () => {
    await page.keyboard.press('Tab');
});

When('the user presses the Enter key', async () => {
    await page.keyboard.press('Enter');
}); 

Then('the user should see their name {string} on the petition page', async function (fullName: string) {
    const html = await page.content();
    expect(html).toContain(fullName);
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
});