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
    
    /**
     * Returns a locator for the user's name within the petition container.
     * @param fullName The full name to search for
     */
    getNameInPetitionContainer(fullName: string): Locator {
        const container = this.page.locator('div.max-h-96.overflow-y-auto');
        return container.locator(`span.text-gray-900.font-medium.text-lg:has-text(\"${fullName}\")`);
    }

    async pressTab() {
        await this.page.keyboard.press('Tab');
    }

    async pressEnter() {
        await this.page.keyboard.press('Enter');
    }
}