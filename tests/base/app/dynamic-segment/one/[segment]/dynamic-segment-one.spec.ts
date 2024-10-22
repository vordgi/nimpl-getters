import { test, expect } from "@playwright/test";

test("should return correct pathname and params for one page with segments", async ({ page }) => {
    await page.goto("/dynamic-segment/one/segment1");
    page.waitForSelector("#dynamic-segment-one-page");

    const pathname = await page.$("#get-pathname");
    expect(await pathname?.textContent()).toBe("/dynamic-segment/one/segment1");

    const params = await page.$("#get-params");
    const paramsRow = await params?.textContent();
    expect(paramsRow && JSON.parse(paramsRow)).toEqual({ segment: "segment1" });
});
