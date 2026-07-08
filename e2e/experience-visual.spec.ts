import { test, expect } from "@playwright/test";

test.describe("Experience section responsive spacing", () => {
  test("matches baseline on tablet and desktop", async ({ page }, testInfo) => {
    await page.goto("/#experience", { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);

    // Hide fixed / animated chrome so only the Experience section is captured
    await page.addStyleTag({
      content: `
        header.fixed { display: none !important; }
        div.fixed.h-px { display: none !important; }
        svg[aria-label*="knowledge graph"] { display: none !important; }
      `,
    });

    const experience = page.locator("#experience");
    await expect(experience).toBeVisible();

    const viewportName = testInfo.project.name;
    await expect(experience).toHaveScreenshot(`experience-${viewportName}.png`, {
      maxDiffPixels: 100,
      threshold: 0.1,
      timeout: 15000,
    });
  });
});
