import { test, expect } from "@playwright/test";

test("should return correct page params and pathname", async ({ page }) => {
    await page.goto("/groups");
    page.waitForSelector("#groups-page");

    const pathname = await page.$("#get-pathname");
    const pathnameRow = await pathname?.textContent();
    expect(pathnameRow).toEqual("/groups");

    const params = await page.$("#get-params");
    const paramsRow = await params?.textContent();
    expect(paramsRow && JSON.parse(paramsRow)).toEqual({});
});
