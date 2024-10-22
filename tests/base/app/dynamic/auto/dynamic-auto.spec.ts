import { test, expect } from "@playwright/test";

test("should return correct page config on dynamic auto page", async ({ page }) => {
    await page.goto("/dynamic/auto");
    page.waitForSelector("#dynamic-auto-page");

    const pageConfig = await page.$("#get-page-config");
    const pageConfigRow = await pageConfig?.textContent();
    expect(pageConfigRow && JSON.parse(pageConfigRow)).toEqual({
        basePath: "",
        dynamic: "auto",
        pagePath: `/dynamic/auto/page`,
    });
});
