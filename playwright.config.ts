import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import { resolve } from 'path'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testMatch: '?(*.)+(e2e).[jt]s?(x)',
  testDir: './packages',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry everywhere */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['line'], ['allure-playwright']]
    : [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Port to use for Playwright component endpoint. */
    // @ts-ignore
    ctPort: 3100,

    ctViteConfig: {
      resolve: {
        alias: [
          {
            find: /^@v-uik\/showroom\/([\w-]+)/,
            replacement: resolve(__dirname, 'docs/showroom/$1'),
          },
          {
            find: /^@v-uik\/([\w-]+)/,
            replacement: resolve(__dirname, 'packages/$1/src'),
          },
        ],
      },
    },
    launchOptions: {
      ignoreDefaultArgs: ['--hide-scrollbars'],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'iPhone SE',
      testMatch: '?(*.)+(e2e).mobile.[jt]s?(x)',
      use: {
        ...devices['iPhone SE'],
      },
    },
    {
      name: 'iPhone 11',
      testMatch: '?(*.)+(e2e).mobile.[jt]s?(x)',
      use: {
        ...devices['iPhone 11'],
      },
    },
    {
      name: 'iPad Pro 11',
      testMatch: '?(*.)+(e2e).mobile.[jt]s?(x)',
      use: {
        ...devices['iPad Pro 11'],
      },
    },
  ],
}

export default config
