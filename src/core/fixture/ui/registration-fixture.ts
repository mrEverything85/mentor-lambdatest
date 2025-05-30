import { test as baseTest } from '../lambdatest/lambdatest-fixture';
import { UserRegistrationPage } from '../../../pages/registration/user-registration';

export const test = baseTest.extend<{
    registrationPage: UserRegistrationPage;
}>({
    registrationPage: async ({ page }, use) => {
        const registrationPage = new UserRegistrationPage(page);
        await registrationPage.gotoRegistrationPage();
        await use(registrationPage);
    },
});

export { expect } from '@playwright/test';