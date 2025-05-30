import { test } from '../../../core/fixture/ui/registration-fixture';
import { expect } from '@playwright/test';
import registrationData from './registration-data.json'; 

test.describe('User Registration', () => {

    test('TC01: Verify user can complete registration process as a learner', async ({ page, registrationPage }) => {
        const learner = registrationData.learner;
        const newEmail = `${Date.now()}${learner.email}`;
        const newPassword = `${Date.now()}${learner.password}`;
        const learnerDetails = learner.details;

        await test.step('Step 1: Account Creation', async () => {
            await registrationPage.fillAccountDetails(newEmail, newPassword);
        });

        await test.step('Step 2: Profile Setup', async () => {
            await registrationPage.fillFullName(learnerDetails.fullName);
            await registrationPage.fillBio(learnerDetails.bio);
            await registrationPage.uploadAvatar(learnerDetails.avatarPath);
            await registrationPage.selectLearnerRole();
            await registrationPage.selectPreferredCommunication(
                learnerDetails.preferredCommunication[1]
            );
            await registrationPage.selectAvailability(learnerDetails.availability);
            await registrationPage.fillLearningObjectives(learnerDetails.learningObjectives);
            await registrationPage.continueToFinalStep();
        });
        
        await test.step('Step 3: Preferences Setup', async () => {
            await registrationPage.selectInterestsTopic(
                learnerDetails.preferences.topics
            );
            await registrationPage.selectLearningStyle(
                learnerDetails.preferences.learningStyle
            );
            await registrationPage.selectPrivateCheckbox(learnerDetails.preferences.isPrivateProfile);
            await registrationPage.clickCompleteRegistration();
        });

        await test.step('Verify Registration Success', async () => {
            await expect(page).toHaveURL('/login');
        });
    });

    test('TC02: Verify user can complete registration process as a mentor', async ({ page, registrationPage }) => {
        const mentor = registrationData.mentor;
        const newEmail = `${Date.now()}${mentor.email}`;
        const newPassword = `${Date.now()}${mentor.password}`;
        const mentorDetails = mentor.details;

        await test.step('Step 1: Account Creation', async () => {
            await registrationPage.fillAccountDetails(newEmail, newPassword);
        });

        await test.step('Step 2: Profile Setup', async () => {
            await registrationPage.selectMentorRole();
            await registrationPage.fillFullName(mentorDetails.fullName);
            await registrationPage.uploadAvatar(mentorDetails.avatarPath);
            await registrationPage.fillBio(mentorDetails.bio);
            await registrationPage.selectPreferredCommunication(
                mentorDetails.preferredCommunication[1]
            );
            await registrationPage.selectExpertise(mentorDetails.expertise);
            await registrationPage.fillProfessionalSkills(
                mentorDetails.professionalSkills
            );
            await registrationPage.fillIndustryExperience(
                mentorDetails.industryExperience
            );
            await registrationPage.continueToFinalStep();
        });

        await test.step('Step 3: Preferences Setup', async () => {
            await registrationPage.selectTeachingApproach(
                mentorDetails.preferences.teachingApproach
            );
            await registrationPage.selectPrivateCheckbox(mentorDetails.preferences.isPrivateProfile);
            await registrationPage.clickCompleteRegistration();
        });

        await test.step('Verify Registration Success', async () => {
            await expect(page).toHaveURL('/login');
        });
    });
});