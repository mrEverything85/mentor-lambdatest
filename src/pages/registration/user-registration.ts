import { Page, Locator, test } from '@playwright/test';
import { BasePage } from '../base-page';
import * as path from 'path';
import * as fs from 'fs';

export class UserRegistrationPage extends BasePage {
    // Step 1: Account Creation Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly termsCheckbox: Locator;
    private readonly continueToProfileButton: Locator;

    // Step 2: Profile Setup Locators
    private readonly fullNameInput: Locator;
    private readonly bioInput: Locator;
    private readonly addImageButton: Locator;
    private readonly learnerButton: Locator;
    private readonly mentorButton: Locator;

    private readonly continueToFinalButton: Locator;
    
    // Learner Role Locators
    private readonly learningObjectivesInput: Locator;

    // Mentor Role Locators
    private readonly professionalSkillsInput: Locator;
    private readonly industryExperienceInput: Locator;

    // Step 3: Preferences Locators
    private readonly privateProfileCheckbox: Locator;
    private readonly completeRegistrationButton: Locator;

    constructor(page: Page) {
        super(page);
        
        // Step 1: Account Creation Locators
        this.emailInput = page.getByPlaceholder('Enter your email here');
        this.passwordInput = page.locator('#password');
        this.confirmPasswordInput = page.locator('#confirmPassword');
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I agree to the Terms of' });
        this.continueToProfileButton = page.getByRole('button', { name: 'Continue to Profile Setup' });

        // Step 2: Profile Setup Locators
        this.fullNameInput = page.getByPlaceholder('Enter your full name');
        this.bioInput = page.getByRole('textbox', { name: 'Bio' });
        this.addImageButton = page.getByRole('img');
        this.learnerButton = page.getByRole('button', { name: 'Learner I want to find' });
        this.mentorButton = page.getByRole('button', { name: 'Mentor I want to mentor' });
        
        // Learner Role Locators
        this.learningObjectivesInput = page.getByRole('textbox', { name: 'What do you hope to learn?' });

        // Mentor Role Locators
        this.professionalSkillsInput = page.getByRole('textbox', { name: 'Professional Skills' });
        this.industryExperienceInput = page.getByRole('textbox', { name: 'Industry Experience' });

        // Step 3: Preferences Locators
        this.privateProfileCheckbox = page.getByRole('checkbox', { name: 'Private profile' });
        this.completeRegistrationButton = page.getByRole('button', { name: 'Complete Registration' });
        this.continueToFinalButton = page.getByRole('button', { name: 'Continue to Final Step' });
    }

    async gotoRegistrationPage(): Promise<void> {
        await this.page.goto('/login');
        await this.page.getByRole('link', { name: 'Sign up' }).click();
        await this.waitForPageLoad();
    }

    async fillAccountDetails(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.termsCheckbox.check();
        await this.continueToProfileButton.click();
    }

    async fillFullName(fullName: string): Promise<void> {
        await this.fullNameInput.fill(fullName);
    }

    async fillBio(bio: string): Promise<void> {
        await this.bioInput.fill(bio);
    }

    async selectLearnerRole(): Promise<void> {
        await this.learnerButton.click();
    }

    async selectMentorRole(): Promise<void> {
        await this.mentorButton.click();
    }

    async selectPreferredCommunication(method: string): Promise<void> {
        await this.page.getByRole('button', { name: method }).click();
    }

    async selectAvailability(availabilities: string[]): Promise<void> {
        for (const availability of availabilities) {
            await this.page.getByRole('button', { name: availability }).click();
        }
    }

    async fillLearningObjectives(objectives: string): Promise<void> {
        await this.learningObjectivesInput.fill(objectives);
    }

    async selectExpertise(expertise: string[]): Promise<void> {
        for (const area of expertise) {
            await this.page.getByRole('button', { name: area }).click();
        }
    }

    async fillProfessionalSkills(skills: string): Promise<void> {
        await this.professionalSkillsInput.fill(skills);
    }

    async fillIndustryExperience(experience: string): Promise<void> {
        await this.industryExperienceInput.fill(experience);
    }

    async selectTeachingApproach(teachingApproach: string[]): Promise<void> {
        for (const approach of teachingApproach) {
            await this.page.getByRole('button', { name: approach }).click();
        }
    }

    async continueToFinalStep(): Promise<void> {
        await this.continueToFinalButton.click();
    }

    async selectInterestsTopic(interest: string[]): Promise<void> {
        for (const topic of interest) {
            await this.page.getByRole('button', { name: topic }).click();
        }
    }

    async selectLearningStyle(style: string): Promise<void> {
        await this.page.getByRole('button', { name: style }).click();
    }

    async selectPrivateCheckbox(isPrivate: boolean): Promise<void> {
        if (isPrivate) {
            await this.privateProfileCheckbox.check();
        } else {
            await this.privateProfileCheckbox.uncheck();
        }
    }

    async clickCompleteRegistration(): Promise<void> {
        await this.completeRegistrationButton.click();
    }

    async uploadAvatar(imageName: string): Promise<void> {
        await test.step('Upload avatar image', async () => {
            const absolutePath = this.getTestImagePath(imageName);

            if (!fs.existsSync(absolutePath)) {
                throw new Error(`File not found: ${absolutePath}`);
            }

            const allowedTypes = ['.jpg', '.jpeg', '.png'];
            const fileExt = path.extname(absolutePath).toLowerCase();
            if (!allowedTypes.includes(fileExt)) {
                throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
            }

            if (await this.addImageButton.isVisible()) {
                await this.addImageButton.click();
            }

            await this.addImageButton.setInputFiles(absolutePath);
        });
    }

    private getTestImagePath(imageName: string): string {
        return path.join(__dirname, '..', '..', 'resource', 'image', imageName);
    }
}