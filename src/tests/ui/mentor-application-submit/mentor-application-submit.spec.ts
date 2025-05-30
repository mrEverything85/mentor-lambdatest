import { expect } from '@playwright/test';
import { test } from '../../../core/fixture/ui/application-submit-fixture';
import { MentorApplicationPage } from '../../../pages/mentor-application/mentor-application';
import mentorApplicationData from './mentor-application-data.json';

test.describe('Mentor Application Submission', () => {
    let mentorApplicationPage: MentorApplicationPage;

    test('TC01: Verify mentor can submit mentor application with valid data', async ({ 
        page, 
        createAndLoginMentor 
    }) => {
        mentorApplicationPage = new MentorApplicationPage(page);
        const { education, profession, motivation } = mentorApplicationData.valid_application;

        await test.step('1. Create new account and login as new mentor using API', async () => {
            await createAndLoginMentor();
        });

        await test.step('2. Navigate to application form', async () => {
            await mentorApplicationPage.navigateToApplication();
        });

        await test.step('3. Fill application form', async () => {
            await mentorApplicationPage.fillEducation(education);
            await mentorApplicationPage.fillProfessionalExperience(profession);
            await mentorApplicationPage.fillMotivation(motivation);
        });

        await test.step('4. Submit application', async () => {
            await mentorApplicationPage.submitApplication();
            await expect(await mentorApplicationPage.isApplicationSubmitted()).toBeTruthy();
        });
    });

    test('TC02: Verify mentor should not submit mentor application with invalid data', async ({ 
    page, 
    createAndLoginMentor 
}) => {
    mentorApplicationPage = new MentorApplicationPage(page);
    const { education, profession, motivation } = mentorApplicationData.invalid_application;
    
    await test.step('1. Create new account and login as new mentor using API', async () => {
        await createAndLoginMentor();
    });

    await test.step('2. Navigate to application form', async () => {
        await mentorApplicationPage.navigateToApplication();
    });

    await test.step('3. Fill application form with invalid data', async () => {
        await mentorApplicationPage.fillEducation(education);
        await mentorApplicationPage.fillProfessionalExperience(profession);
        await mentorApplicationPage.fillMotivation(motivation);
    });

    await test.step('4. Submit application and verify error', async () => {
        await mentorApplicationPage.submitApplication();
        await expect(await mentorApplicationPage.isEducationRequired()).toBeTruthy();
        await expect(await mentorApplicationPage.isExperienceRequired()).toBeTruthy();
    });
});
});