import { expect } from '@playwright/test';
import { test } from '../../../core/fixture/ui/login-fixture';
import { RoleManagementPage } from '../../../pages/role-management/role-management';
import roleManagementData from './role-management.json';

test.describe('Role Management', () => {
    let roleManagementPage: RoleManagementPage;

    test.beforeEach(async ({ page, loginAs }) => {
        roleManagementPage = new RoleManagementPage(page);
        await loginAs('admin');
        await roleManagementPage.navigateToUsers();
    });
    
    for (const {role, email} of [roleManagementData.mentor_account, roleManagementData.learner_account]) {
        test(`TC01: Verify admin should search ${role} users`, async () => {
            await test.step(`1. Filter by ${role} role`, async () => {
                await roleManagementPage.filterByRole(role);
            });
            await test.step('2. Search user by email', async () => {
                await roleManagementPage.searchUserByEmail(email);
            });
            await test.step('3. Verify search result', async () => {
                expect(await roleManagementPage.getSearchResultText(email)).toBe(email);
            });
        });
    }
});
