import { expect, test, type Page } from "@playwright/test";

// Dropzone's whole point is drag-and-drop, so this drops a real file rather
// than setting the hidden input. Playwright has no built-in for it: the File
// has to be built inside the page and handed back as a DataTransfer.
async function dropFile(page: Page, selector: string, name: string) {
  const dataTransfer = await page.evaluateHandle((name) => {
    const transfer = new DataTransfer();
    // Deliberately not an image: a fake one would fail to decode and trip the
    // thumbnail error path, which is not what this is testing.
    transfer.items.add(new File(["hello"], name, { type: "text/plain" }));
    return transfer;
  }, name);

  await page.locator(selector).dispatchEvent("drop", { dataTransfer });
}

test("the demo accepts a dropped file", async ({ page }) => {
  await page.goto("/");

  const zone = page.locator(".dropzone");
  await expect(zone.locator(".dz-message")).toBeVisible();
  await expect(zone.locator(".dz-preview")).toHaveCount(0);

  await dropFile(page, ".dropzone", "hello.txt");

  const preview = zone.locator(".dz-preview");
  await expect(preview).toHaveCount(1);
  await expect(preview.locator("[data-dz-name]")).toHaveText("hello.txt");
});

test("the demo stops accepting after four files", async ({ page }) => {
  await page.goto("/");

  // The attachment overrides addFile to cap the demo at four.
  for (let i = 1; i <= 6; i++) {
    await dropFile(page, ".dropzone", `file-${i}.txt`);
  }

  await expect(page.locator(".dropzone .dz-preview")).toHaveCount(4);
});
