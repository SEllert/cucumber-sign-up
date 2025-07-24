import { Page, Locator } from "playwright";

export class SignUpPage {
    readonly page: Page;
    readonly signUpField: Locator;
    readonly signUpButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpField = page.locator('#fullName');
        this.signUpButtonLocator = page.getByRole('button', { name: 'Sign the Petition' });
    }

    async goto() {
        await this.page.goto('https://gleeful-smakager-dc1a05.netlify.app/');
    }
}