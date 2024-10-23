import { test, expect } from "@playwright/test";

test("should return correct page config on dynamic error page", async ({ page }) => {
    await page.goto("/dynamic/error");
    page.waitForSelector("#dynamic-error-page");

    const pageConfig = await page.$("#get-page-config");
    const pageConfigRow = await pageConfig?.textContent();
    expect(pageConfigRow && JSON.parse(pageConfigRow)).toEqual({
        basePath: "",
        dynamic: "error",
        pagePath: `/dynamic/error/page`,
    });
});
