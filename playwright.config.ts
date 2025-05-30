import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const isCI = !!process.env.CI;
const isLambdaTest = process.env.TEST_ENV === 'lambdatest';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: !isCI,
  workers: isCI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'https://happy-wave-0355c8300.6.azurestaticapps.net/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'local-chrome',
      use: {
        ...devices['Desktop Chrome'],
        headless: isCI,
      },
    },
    {
      name: 'local-firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: isCI,
      },
    },
    ...(isLambdaTest ? [
      {
        name: 'lambdatest-chrome',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'lambdatest-firefox',
        use: { ...devices['Desktop Firefox'] },
      }
    ] : [])
  ],
});
