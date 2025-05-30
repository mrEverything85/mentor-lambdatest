import * as base from '@playwright/test';
import { chromium } from 'playwright';
import path from 'path';
import 'dotenv/config';

// LambdaTest capabilities
const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 10',
    build: 'Playwright TypeScript Build with POM',
    name: 'Playwright POM Test',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: true,
    video: true,
    console: true,
    tunnel: false,
  },
};

const modifyCapabilities = (configName: string, testName: string) => {
  const config = configName.split('@lambdatest')[0];
  const [projectBrowser, browserVersion, platform] = config.split(':');
  const browserMap: { [key: string]: string } = {
    'lambdatest-chrome': 'Chrome', // Map project name to LambdaTest browser
    'lambdatest-firefox': 'pw-firefox',
    'lambdatest-edge': 'MicrosoftEdge',
  };
  const selectedBrowser = browserMap[projectBrowser] || 'Chrome'; // Fallback to Chrome
  capabilities.browserName = selectedBrowser;
  capabilities.browserVersion = browserVersion || 'latest';
  capabilities['LT:Options']['platform'] = platform || 'Windows 10';
  capabilities['LT:Options']['name'] = testName;
  // Validate browserName
  const validBrowsers = ['Chrome', 'MicrosoftEdge', 'pw-chromium', 'pw-firefox', 'pw-webkit'];
  if (!validBrowsers.includes(capabilities.browserName)) {
    throw new Error(`Unsupported browserName: ${capabilities.browserName}. Must be one of: ${validBrowsers.join(', ')}`);
  }
};

// Extend Playwright test with custom fixtures
export const test = base.test.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${testInfo.file.split(path.sep).pop()}`);
      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
      });
      const ltPage = await browser.newPage(testInfo.project.use);
      await use(ltPage);
      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: testInfo.error?.message || 'Test completed',
        },
      };
      await ltPage.evaluate(() => {}, `lambdatest_action: ${JSON.stringify(testStatus)}`);
      await ltPage.close();
      await browser.close();
    } else {
      await use(page); // Local execution
    }
  },
});

export default test;