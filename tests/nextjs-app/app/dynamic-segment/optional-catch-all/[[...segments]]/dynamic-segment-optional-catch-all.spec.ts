import { test, expect } from "@playwright/test";

test("should return correct pathname and params for optional-catch-all page with segments", async ({ page }) => {
  await page.goto('/dynamic-segment/optional-catch-all/segment1/segment2');
  page.waitForSelector('#dynamic-segment-optional-catch-all-page');

  const pathname = await page.$('#get-pathname');
  expect(await pathname?.textContent()).toBe('/dynamic-segment/optional-catch-all/segment1/segment2');

  const params = await page.$('#get-params');
  const paramsRow = await params?.textContent();
  expect(paramsRow && JSON.parse(paramsRow)).toEqual({ segments: ['segment1', 'segment2'] });
});

test("should return correct pathname and empty params for optional-catch-all page without segments", async ({ page }) => {
  await page.goto('/dynamic-segment/optional-catch-all');
  page.waitForSelector('#dynamic-segment-optional-catch-all-page');

  const pathname = await page.$('#get-pathname');
  expect(await pathname?.textContent()).toBe('/dynamic-segment/optional-catch-all');

  const params = await page.$('#get-params');
  const paramsRow = await params?.textContent();
  expect(paramsRow && JSON.parse(paramsRow)).toEqual({});
});
