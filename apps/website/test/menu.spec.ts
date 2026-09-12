import { expect, test } from "@playwright/test";

// Replaces the tests that checked for a "Sign in" link into Dropzone Plus,
// which no longer exists.
test("the mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the hamburger is only rendered on narrow viewports");

  await page.goto("/");

  const nav = page.locator("nav.mobile");
  await expect(nav).not.toBeVisible();

  await page.getByLabel("Open Menu").click();
  await expect(nav).toBeVisible();

  await page.getByLabel("Close Menu").click();
  await expect(nav).not.toBeVisible();
});

test("the header links to the repository", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.locator('header a[href="https://github.com/enyo/dropzone"]').first(),
  ).toBeAttached();
});
