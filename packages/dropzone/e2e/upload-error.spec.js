import { test, expect } from "@playwright/test";
import { dropFile } from "./support/drop-file.js";

// The unit suite drives failures through a fake XMLHttpRequest. This is the
// same path against the built bundle, a real request and a real 500, so the
// error reaches the preview the way a user would see it.
test.describe("Dropzone against a server that rejects the upload", () => {
  test("marks the file as errored and shows the message", async ({ page }) => {
    await page.goto("/1-basic/upload_error.html");

    const upload = page.waitForResponse(
      (response) =>
        response.request().method() === "POST" && new URL(response.url()).pathname === "/fail",
    );

    await dropFile(page, ".dropzone", "image.jpg", "image/jpeg");
    await upload;

    const preview = page.locator(".dz-preview");
    await expect(preview).toHaveClass(/dz-error/);
    await expect(preview).not.toHaveClass(/dz-success/);
    // The server answers with {"error": "..."} as application/json, and the
    // default error handler unwraps that `error` key, so what the user sees is
    // the server's own message rather than dictResponseError.
    await expect(preview.locator("[data-dz-errormessage]")).toContainText(
      "Upload rejected by the server",
    );
  });
});
