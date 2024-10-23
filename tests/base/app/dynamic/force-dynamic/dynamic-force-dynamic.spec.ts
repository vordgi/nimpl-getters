import { test, expect } from "@playwright/test";

test("should return correct page config on dynamic force-dynamic page", async ({ page }) => {
    await page.goto("/dynamic/force-dynamic");
    page.waitForSelector("#dynamic-force-dynamic-page");

    const pageConfig = await page.$("#get-page-config");
    const pageConfigRow = await pageConfig?.textContent();
    // locally it returns also revalidate: 0, but in github actions nope
    expect(pageConfigRow && JSON.parse(pageConfigRow)).toMatchObject({
        basePath: "",
        dynamic: "force-dynamic",
        pagePath: `/dynamic/force-dynamic/page`,
    });
});
