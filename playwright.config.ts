import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://happy-wave-0355c8300.6.azurestaticapps.net/',
    headless: false,
  },

  projects: [
    {
      name: 'lambdatest-chrome', // Maps to Chrome in modifyCapabilities
      use: {
        browserName: 'chromium', // Playwright browser type
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'lambdatest-firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'local-chrome',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
