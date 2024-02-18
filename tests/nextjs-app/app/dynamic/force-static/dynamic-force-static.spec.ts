import { test, expect } from "@playwright/test";

test("should not return search params on dynamic force-static page", async ({ page }) => {
  await page.goto("/dynamic/force-static?param1=value1&param2=value2");
  page.waitForSelector('#dynamic-force-static-page');

  const searchParams = await page.$('#get-search-params');
  const searchParamsRow = await searchParams?.textContent();
  expect(searchParamsRow && JSON.parse(searchParamsRow)).toEqual("");
});

test("should return correct page config on dynamic force-static page", async ({ page }) => {
  await page.goto("/dynamic/force-static");
  page.waitForSelector('#dynamic-force-static-page');

  const pageConfig = await page.$('#get-page-config');
  const pageConfigRow = await pageConfig?.textContent();
  expect(pageConfigRow && JSON.parse(pageConfigRow)).toEqual({ basePath: "", dynamic: 'force-static', pagePath: `/dynamic/force-static/page`, revalidate: 60 });
});
