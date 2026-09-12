import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.WEBSITE_TEST_PORT ?? 3318);

// These drive the built site, so the server command builds it first -- through
// the repo script, because the site demos the library from this workspace and
// that has to be built before the website can resolve it.
export default defineConfig({
  testDir: "test",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
  },

  // Both projects are Chromium, so CI installs one browser. Widen this if the
  // site starts doing something engine-specific.
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],

  webServer: {
    command: `bash ../../scripts/build-site.sh website && pnpm exec vite preview --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "ignore",
  },
});
