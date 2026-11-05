import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'resume-gallery.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  expect: { timeout: 20_000 },
  outputDir: '.local/resume-gallery/test-results',
  use: {
    actionTimeout: 20_000,
    baseURL: process.env.GALLERY_TEST_URL || 'http://127.0.0.1:3217',
    viewport: { width: 1280, height: 900 },
    browserName: 'chromium',
    channel: 'chrome',
    screenshot: 'only-on-failure',
    launchOptions: { args: ['--no-sandbox'] },
  },
});
