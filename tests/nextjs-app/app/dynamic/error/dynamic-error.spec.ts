import { test, expect } from "@playwright/test";

test("should not return search params on dynamic error page", async ({ page }) => {
  await page.goto("/dynamic/error?param1=value1&param2=value2");
  page.waitForSelector('#dynamic-error-page');

  const searchParams = await page.$('#get-search-params');
  const searchParamsRow = await searchParams?.textContent();
  expect(searchParamsRow).toEqual("");
});

test("should return correct page config on dynamic error page", async ({ page }) => {
  await page.goto("/dynamic/error");
  page.waitForSelector('#dynamic-error-page');

  const pageConfig = await page.$('#get-page-config');
  const pageConfigRow = await pageConfig?.textContent();
  expect(pageConfigRow && JSON.parse(pageConfigRow)).toEqual({ basePath: "", dynamic: 'error', pagePath: `/dynamic/error/page` });
});
