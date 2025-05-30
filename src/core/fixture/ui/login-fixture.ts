
import { LoginPage } from "../../../pages/login/login-page";
import { test as base } from "@playwright/test";
import loginData from "../../../tests/ui/login/login-data.json";

type UserRole = "learner" | "mentor" | "admin";
type LoginFixture = {
  loginPage: LoginPage;
  loginAs: (role: UserRole) => Promise<void>;
};

export const test = base.extend<LoginFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  loginAs: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    const loginAs = async (role: UserRole) => {
      const credentials = loginData.valid_account[role];

      await loginPage.goToLoginPage();
      await loginPage.enterEmailAddress(credentials.email);
      await loginPage.enterPassword(credentials.password);
      await loginPage.clickLoginButton();
    };

    await use(loginAs);
  }
});
