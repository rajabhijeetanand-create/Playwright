// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dev from './config/env/dev.js';
import qa from './config/env/qa.js';

// Read ENV variable (default = dev)
const env = process.env.ENV || 'dev';

// Load the appropriate environment configuration
const config = env === 'qa' ? qa : dev;

export default defineConfig({

  // Test location
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // One worker in CI
  workers: process.env.CI ? 1 : undefined,

  // Reports
  reporter: [
    ['html'],
    ['junit', { outputFile: 'reports/results.xml' }]
  ],

  // Shared settings
  use: {

    // Environment URL
    baseURL: config.baseURL,

    // Screenshot only when test fails
    screenshot: 'only-on-failure',

    // Save video for failed tests
    video: 'retain-on-failure',

    // Trace on retry
    trace: 'on-first-retry'
  },

  // Browser
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]

});