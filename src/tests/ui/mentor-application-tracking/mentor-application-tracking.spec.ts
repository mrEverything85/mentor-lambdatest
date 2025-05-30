import { expect } from '@playwright/test';
import { test } from '../../../core/fixture/ui/login-fixture';
import { MentorApplicationStatusPage } from '../../../pages/mentor-application/mentor-application-status-tracking';

test.describe('Mentor Application Status Tracking', () => {
    let applicationStatusPage: MentorApplicationStatusPage;

    test('TC01: Verify mentor application should display approved application status for mentor', async ({ 
        page, 
        loginAs
    }) => {
        applicationStatusPage = new MentorApplicationStatusPage(page);

        await test.step('1. Login as approved mentor', async () => {
            await loginAs('mentor');
        });

        await test.step('2. Navigate to application status page', async () => {
            await applicationStatusPage.navigateToApplicationStatus();
        });

        await test.step('3. Verify application status', async () => {
            const status = await applicationStatusPage.getApplicationStatus();
            await expect(status).toContain('Approved');
        });
    });
});