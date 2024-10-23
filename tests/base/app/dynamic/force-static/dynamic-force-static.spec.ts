import { test, expect } from "@playwright/test";

test("should return correct page config on dynamic force-static page", async ({ page }) => {
    await page.goto("/dynamic/force-static");
    page.waitForSelector("#dynamic-force-static-page");

    const pageConfig = await page.$("#get-page-config");
    const pageConfigRow = await pageConfig?.textContent();
    expect(pageConfigRow && JSON.parse(pageConfigRow)).toEqual({
        basePath: "",
        dynamic: "force-static",
        pagePath: `/dynamic/force-static/page`,
    });
});
