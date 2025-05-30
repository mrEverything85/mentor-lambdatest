import { expect } from "@playwright/test";
import  {test} from "../../../core/fixture/ui/login-fixture";
import loginData from "./login-data.json";
import {LoginPage} from "../../../pages/login/login-page";

test.describe('Login Functional Test', () => {
   let loginPage: LoginPage;

   test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goToLoginPage(); 
   });

   test("Verify successful login with correct email and password", async () => {
      await test.step("1. Enter correct email address", async () => {
         await loginPage.enterEmailAddress(loginData.valid_account.learner.email);
      });
      await test.step("2. Enter correct password", async () => {
         await loginPage.enterPassword(loginData.valid_account.learner.password);
      });
      await test.step("3. Click on the Sign in button", async () => {
         await loginPage.clickLoginButton();
      });
      await test.step("4. Verify the user is logged in successfully", async () => {
         await loginPage.verifyMessage('success');
      });
   });
   test("Verify login fails with a correct email but incorrect password", async() =>{
      await test.step("1. Enter correct email address", async()=>{
         await loginPage.enterEmailAddress(loginData.valid_account.learner.email);
      });
      await test.step("2. Enter incorrect password", async()=>{
         await loginPage.enterPassword(loginData.invalid_account.password);
      });
      await test.step("3. Click on the Sign in button", async()=>{
         await loginPage.clickLoginButton();
      });
      await test.step("4. Verify the user is not logged in successfully", async()=>{
         await loginPage.verifyMessage('error');
      });
   });
   test("Verify login fails with a incorrect email but correct password", async() =>{
      await test.step("1. Enter incorrect email address", async()=>{
         await loginPage.enterEmailAddress(loginData.invalid_account.email);
      });
      await test.step("2. Enter correct password", async()=>{
         await loginPage.enterPassword(loginData.valid_account.learner.password);
      });
      await test.step("3. Click on the Sign in button", async()=>{
         await loginPage.clickLoginButton();
      });
      await test.step("4. Verify the user is not logged in successfully", async()=>{
         await loginPage.verifyMessage;
      }); 
   });
   test("Verify login fails with a incorrect email and incorrect password", async() =>{
      await test.step("1. Enter incorrect email address", async()=>{
         await loginPage.enterEmailAddress(loginData.invalid_account.email);
      });
      await test.step("2. Enter incorrect password", async()=>{
         await loginPage.enterPassword(loginData.invalid_account.password);
      });
      await test.step("3. Click on the Sign in button", async()=>{
         await loginPage.clickLoginButton();
      });
      await test.step("4. Verify the user is not logged in successfully", async()=>{
         await loginPage.verifyMessage;
      }); 
   });
   test("Verify login fails with an unregistered email address", async()=>{
      await test.step("1. Enter unregistered email address", async()=>{
         await loginPage.enterEmailAddress(loginData.unregistered_account.email);
      });
      await test.step("2. Enter a valid password", async()=>{
         await loginPage.enterPassword(loginData.valid_account.learner.password);
      });
      await test.step("3. Click on the Sign up button", async() =>{
         await loginPage.clickSignUp();
      });
      await test.step("4. Verify the user is not logged in successfully", async() =>{
         await loginPage.verifyMessage;
      });
   });
});
