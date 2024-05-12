import { test, expect } from "@playwright/test";

test("should not return search params on dynamic force-static-revalidate page", async ({ page }) => {
  await page.goto("/dynamic/force-static-revalidate?param1=value1&param2=value2");
  page.waitForSelector('#dynamic-force-static-revalidate-page');

  const searchParams = await page.$('#get-search-params');
  const searchParamsRow = await searchParams?.textContent();
  const urlSearchParams = searchParamsRow && new URLSearchParams(searchParamsRow);
  expect(urlSearchParams).toBeTruthy();

  expect(urlSearchParams && urlSearchParams.size).toBe(2);
  expect(urlSearchParams && urlSearchParams.get('param1')).toBe('value1');
  expect(urlSearchParams && urlSearchParams.get('param2')).toBe('value2');
});

test("should return correct page config on dynamic force-static-revalidate page", async ({ page }) => {
  await page.goto("/dynamic/force-static-revalidate");
  page.waitForSelector('#dynamic-force-static-revalidate-page');

  const pageConfig = await page.$('#get-page-config');
  const pageConfigRow = await pageConfig?.textContent();
  expect(pageConfigRow && JSON.parse(pageConfigRow)).toEqual({ basePath: "", dynamic: 'force-static', pagePath: `/dynamic/force-static-revalidate/page`, revalidate: 0 });
});
