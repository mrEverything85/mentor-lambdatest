import { test as base } from '@playwright/test';
import { RegisterAPI } from '../../../api/api-service/register/register.api';
import { RegisterAccount } from '../../../data-types/register/register-type';
import { 
    UserRole,
    PreferredCommunication,
    SessionFrequency,
    LearningStyle 
} from '../../enum/registration-enum';

type RegistrationFixture = {
    registerAPI: RegisterAPI;
    createUniqueTestAccount: () => RegisterAccount;
};

export const test = base.extend<RegistrationFixture>({
    registerAPI: async ({ request }, use) => {
        const api = new RegisterAPI(request);
        await use(api);
    },

    createUniqueTestAccount: async ({ }, use) => {
        const createAccount = () => {
            const timestamp = new Date().getTime();
            return {
                Email: `test.user${timestamp}@example.com`,
                Password: "Test123!",
                Role: UserRole.Mentor,
                UserDetailsToAddDTO: {
                    FullName: "Test User",
                    Bio: "Test bio test11",
                    Avatar: "",
                    Skills: "Testing",
                    Experience: "2 years",
                    PrefferedComm: PreferredCommunication.VideoCall,
                    LearningGoal: "Learn testing aaaaaaaa and become the best",
                    SessionFreq: SessionFrequency.Weekly,
                    SessionDur: 0,
                    PrefferedStyle: LearningStyle.Visual,
                    Availability: "Weekends",
                    Expertise: "Testing QA",
                    Preference: "Morning",
                    TeachingApproach: "Hands-on",
                    IsPrivate: false,
                    MessageAllowed: true,
                    NotiAllowed: true
                }
            } as RegisterAccount;
        };
        await use(createAccount);
    }
});

export { expect } from '@playwright/test';