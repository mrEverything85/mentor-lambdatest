import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page';

export class MentorApplicationStatusPage extends BasePage {
    private readonly myApplicationLink: Locator;
    private readonly applicationStatus: Locator;

    constructor(page: Page) {
        super(page);
        this.applicationStatus = page.getByText('Approved', { exact: true });
        this.myApplicationLink = page.getByRole('link', { name: 'My Application' });
    }

    async navigateToApplicationStatus(): Promise<void> {
        await this.myApplicationLink.click();
    }

    async getApplicationStatus(): Promise<string> {
        await this.applicationStatus.waitFor({ 
            state: 'visible', 
            timeout: 5000 
        });
        return this.applicationStatus.innerText();
    }
}