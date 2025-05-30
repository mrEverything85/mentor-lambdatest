import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

export class MentorApplicationPage extends BasePage {
    private readonly mentorApplicationButton: Locator;

    private readonly educationInput: Locator;
    private readonly professionInput: Locator;
    private readonly motivationInput: Locator;
    private readonly submitButton: Locator;
    
    private readonly successMessage: Locator;
    private readonly educationErrorMessage: Locator;
    private readonly experienceErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        
        this.mentorApplicationButton = page.getByRole('link', { name: 'My Application' });
        this.educationInput = page.getByRole('textbox', { name: 'Bachelor of Science in Computer Science, Hanoi University, 2022' });
        this.professionInput = page.getByRole('textbox', { name: 'Senior Developer at NashTech (2018–2024), responsible for...' });
        this.motivationInput = page.getByRole('textbox', { name: 'Tell us why you want to become a mentor...' });
        this.submitButton = page.getByRole('button', { name: 'Submit Application' });
        this.successMessage = page.getByText('Application submitted');
        this.educationErrorMessage = page.getByText('Please enter your Education.');
        this.experienceErrorMessage = page.getByText('Please enter your Professional Experience.');
    }

    async navigateToApplication(): Promise<void> {
        await this.mentorApplicationButton.click();
    }

    async fillEducation(education: string): Promise<void> {
        await this.educationInput.fill(education);
    }

    async fillProfessionalExperience(experience: string): Promise<void> {
        await this.professionInput.fill(experience);
    }

    async fillMotivation(motivation: string): Promise<void> {
        await this.motivationInput.fill(motivation);
    }

    async submitApplication(): Promise<void> {
        await this.submitButton.click();
    }

    async isApplicationSubmitted(): Promise<boolean> {
        await this.successMessage.waitFor();
        return await this.successMessage.isVisible();
    }

    async isEducationRequired(): Promise<boolean> {
        //await this.educationErrorMessage.waitFor();
        return await this.educationErrorMessage.isVisible();
    }

    async isExperienceRequired(): Promise<boolean> {
        //await this.experienceErrorMessage.waitFor();
        return await this.experienceErrorMessage.isVisible();
    }
}