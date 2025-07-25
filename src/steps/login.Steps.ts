import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../../browswerSetup';
import { LoginPage } from '../page-objects/login-page.pom';
import { Console } from 'console';


let loginPage: LoginPage;

Given('the user is on the login page', async () => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

When('the user enters a valid email {string} and password {string}', async (email: string, password: string) => {
    await loginPage.emailLocator.fill(email);
    await loginPage.passwordLocator.fill(password);
    console.log(`Email: ${email}, Password: ${password}`);
});

Then('the user should see their password {string} in the URL', async ( password: string) => {
    await loginPage.signInButtonLocator.click();
    await expect(page.url()).toContain(password);
});