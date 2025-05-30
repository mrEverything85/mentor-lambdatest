import { Page, expect } from "@playwright/test";
import { BasePage } from "../base-page";

export class LoginPage extends BasePage {
  private txtEmailAddressLoc = this.page.getByRole("textbox", {
    name: "Email Address",
  });
  private txtPasswordLoc = this.page.getByRole("textbox", { name: "Password" });
  private btnSiginLoc = this.page.getByRole("button", { name: "Sign In" });
  private lnkForgotPasswordLoc = this.page.getByRole("link", {
    name: "Forgot password?",
  });
  private linkSignUpLoc = this.page.getByRole("link", { name: "Sign up" });
  private lblSuccessMsgLoc = this.page.getByText("Login successfully");
  private lblErrorMsgLoc = this.page.getByText(
    "Password must be at least 8 characters, include a number and a capital letter and a special character"
  );
  private lblErrorMsgUngisterLoc = this.page.getByText("User not found.");
  constructor(page: Page) {
    super(page);
  }

  async goToLoginPage() {
    await this.page.goto("/login");
  }

  async enterEmailAddress(email: string) {
    await this.txtEmailAddressLoc.fill(email);
  }
  async enterPassword(password: string) {
    await this.txtPasswordLoc.fill(password);
  }
  async clickLoginButton() {
    await this.btnSiginLoc.click();
  }
  async clickForgotPassword() {
    await this.lnkForgotPasswordLoc.click();
  }
  async clickSignUp() {
    await this.linkSignUpLoc.click();
  }
  async verifyMessage(type: "success" | "error") {
    if (type === "success") {
      await expect(this.lblSuccessMsgLoc).toBeVisible();
    } else if (type === "error") {
      await expect(this.lblErrorMsgLoc).toBeVisible();
    } else {
      await expect(this.lblErrorMsgUngisterLoc).toBeVisible();
    }
  }
}
