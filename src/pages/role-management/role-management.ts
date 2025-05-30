import { Page, Locator, test } from '@playwright/test';
import { BasePage } from '../base-page';

export class RoleManagementPage extends BasePage {
    private readonly usersLink: Locator;
    private readonly searchBar: Locator;

    constructor(page: Page) {
        super(page);
        
        this.usersLink = page.getByRole('link', { name: 'Users' });
        this.searchBar = page.getByRole('textbox', { name: 'Search users...' });
    }

    async navigateToUsers(): Promise<void> {
        await this.usersLink.click();
        await this.waitForPageLoad();
    }

    async filterByRole(role: string): Promise<void> {
        await this.page.getByRole('button', { name: role }).click();
    }

    async searchUserByEmail(email: string): Promise<void> {
        await this.searchBar.fill(email);
    }

    async getSearchResultText(email: string): Promise<string> {
        const searchResult = this.page.getByText(email);
        return searchResult.innerText();
    }
}