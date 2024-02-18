import { test, expect } from "@playwright/test";

test("should not return search params on dynamic auto page by default", async ({ page }) => {
  await page.goto("/dynamic/auto?param1=value1&param2=value2");
  page.waitForSelector('#dynamic-auto-page');

  const searchParams = await page.$('#get-search-params');
  const searchParamsRow = await searchParams?.textContent();
  expect(searchParamsRow).toEqual("");
});

test("should return correct page config on dynamic auto page", async ({ page }) => {
  await page.goto("/dynamic/auto");
  page.waitForSelector('#dynamic-auto-page');

  const pageConfig = await page.$('#get-page-config');
  const pageConfigRow = await pageConfig?.textContent();
  expect(pageConfigRow && JSON.parse(pageConfigRow)).toEqual({ basePath: "", dynamic: 'auto', pagePath: `/dynamic/auto/page` });
});
