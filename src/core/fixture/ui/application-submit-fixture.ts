import { test as baseTest } from '../lambdatest/lambdatest-fixture';
import { RegisterAPI } from '../../../api/api-service/register/register.api';
import { LoginPage } from '../../../pages/login/login-page';
import { RegisterAccount } from '../../../data-types/register/register-type';
import { LoginAPI } from '../../../api/api-service/login/login.api';
import { 
    UserRole,
    PreferredCommunication,
    SessionFrequency,
    LearningStyle 
} from '../../enum/registration-enum';

export const test = baseTest.extend<{
    registerAPI: RegisterAPI;
    loginAPI: LoginAPI;
    createAndLoginMentor: () => Promise<{ email: string; password: string }>;
}>({
    registerAPI: async ({ request }, use) => {
        const api = new RegisterAPI(request);
        await use(api);
    },
    loginAPI: async ({ request }, use) => {
        const api = new LoginAPI(request);
        await use(api);
    },

    createAndLoginMentor: async ({ page, registerAPI, loginAPI }, use) => {
        const loginPage = new LoginPage(page);

        const createAndLogin = async () => {
            // Create unique test account
            const timestamp = new Date().getTime();
            const email = `mentor.test${timestamp}@example.com`;
            const password = 'Test123!';

            const testAccount: RegisterAccount = {
                Email: email,
                Password: password,
                Role: UserRole.Mentor,
                UserDetailsToAddDTO: {
                    FullName: "Test Mentor",
                    Bio: "Experienced mentor",
                    Avatar: "",
                    Skills: "Testing, Automation",
                    Experience: "5 years",
                    PrefferedComm: PreferredCommunication.VideoCall,
                    LearningGoal: "",
                    SessionFreq: SessionFrequency.Weekly,
                    SessionDur: 60,
                    PrefferedStyle: LearningStyle.Visual,
                    Availability: "Weekends",
                    Expertise: "QA Automation",
                    Preference: "Morning",
                    TeachingApproach: "Hands-on",
                    IsPrivate: false,
                    MessageAllowed: true,
                    NotiAllowed: true
                }
            };
            
            const loginAccount = {
                email: email,
                password: password,
                rememberMe: true
            };

            // Register account via API
            await registerAPI.registerAccount(testAccount);

            // Get user ID from response in the login API
            const loginResponse = await loginAPI.loginAccount(loginAccount);
            const responseBody = await loginResponse.json();
            const userId = responseBody.userLoginToReturnDTO.userID;

            // Activate account
            await registerAPI.activateAccount(userId);

            // Login via UI
            await loginPage.goToLoginPage();
            await loginPage.enterEmailAddress(email);
            await loginPage.enterPassword(password);
            await loginPage.clickLoginButton();

            return { email, password };
        };

        await use(createAndLogin);
    }
});

export { expect } from '@playwright/test';