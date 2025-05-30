import { LoginAPI } from "../../../api/api-service/login/login.api";
import { test, expect } from "@playwright/test";
import logInData from "../../api/user-login/account-data.json";

test.describe("Login API Tests", () => {
  let loginAPI: LoginAPI;
  test.beforeEach(async ({ request }) => {
    loginAPI = new LoginAPI(request);
  });
  test("POST - Login user with valid credentials", async () => {
    const loginAccount = logInData.valid_account;
    const { status, ...accountData } = loginAccount;
    const response = await loginAPI.loginAccount(accountData);
    const responseBody = await response.json();

    expect(response.status()).toBe(status);
    expect(responseBody.userLoginToReturnDTO.email).toEqual(accountData.email);
  });
  test("POST - Login user with incorrect ", async () => {
    const loginAccount = logInData.invalid_account;
    const { status, detail, ...accountData } = loginAccount;
    const response = await loginAPI.loginAccount(accountData);
    const responseBody = await response.json();

    expect(response.status()).toBe(status);
    expect(responseBody.detail).toEqual(detail);
  });
  test("POST - Login user with an unregistered email", async () => {
    const loginAccount = logInData.unregistered_account;
    const { status, detail, ...accountData } = loginAccount;
    const response = await loginAPI.loginAccount(accountData);
    const responseBody = await response.json();

    expect(response.status()).toBe(status);
    expect(responseBody.detail).toEqual(detail);
  });
});
