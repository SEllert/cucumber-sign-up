import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../../browswerSetup';
import { SignUpPage } from '../page-objects/signup-page.pom';
import { Console } from 'console';
import { Sign } from 'crypto';


let signUpPage: SignUpPage;

Given('the user is on the signup page', async () => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
});

When('the user enters a Full name {string} into the Full name field', async (fullName: string) => {
    await signUpPage.signUpField.fill(fullName);
});

When('the user presses the Sign the Petition button', async () => {
    await signUpPage.signUpButtonLocator.click();
});

Then('the user should see their name "<fullName>" on the petition page', async (fullName: string) => {
    const html = await page.content();
    expect(html).toContain(fullName);
});