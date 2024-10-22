import { test, expect } from "@playwright/test";

test.describe("get-params with custom pagePaths", async () => {
    test(`should return correct params for /specific/ pages`, async ({ page }) => {
        await page.goto("/specific/de/unknown-page");
        page.waitForSelector("#not-found");

        const params = await page.$("#get-params");
        const paramsRow = await params?.textContent();
        expect(paramsRow && JSON.parse(paramsRow)).toEqual({ locale: "de", subpaths: ["unknown-page"] });
    });
    test(`should return correct params for base pages`, async ({ page }) => {
        await page.goto("/it/base/unknown-page");
        page.waitForSelector("#not-found");

        const params = await page.$("#get-params");
        const paramsRow = await params?.textContent();
        expect(paramsRow && JSON.parse(paramsRow)).toEqual({ locale: "it", subpaths: ["unknown-page"] });
    });
    test(`should return correct params for non defined pagePaths`, async ({ page }) => {
        await page.goto("/it/invalid/unknown-page");
        page.waitForSelector("#not-found");

        const params = await page.$("#get-params");
        const paramsRow = await params?.textContent();
        expect(paramsRow && JSON.parse(paramsRow)).toEqual({});
    });
});
