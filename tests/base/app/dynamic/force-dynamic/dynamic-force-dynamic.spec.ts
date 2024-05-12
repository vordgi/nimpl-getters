import { test, expect } from "@playwright/test";

test("should return search params on dynamic force-dynamic page", async ({ page }) => {
  await page.goto("/dynamic/force-dynamic?param1=value1&param2=value2");
  page.waitForSelector('#dynamic-force-dynamic-page');

  const searchParams = await page.$('#get-search-params');
  const searchParamsRow = await searchParams?.textContent();
  const urlSearchParams = searchParamsRow && new URLSearchParams(searchParamsRow);
  expect(urlSearchParams).toBeTruthy();

  expect(urlSearchParams && urlSearchParams.size).toBe(2);
  expect(urlSearchParams && urlSearchParams.get('param1')).toBe('value1');
  expect(urlSearchParams && urlSearchParams.get('param2')).toBe('value2');
});

test("should return correct page config on dynamic force-dynamic page", async ({ page }) => {
  await page.goto("/dynamic/force-dynamic");
  page.waitForSelector('#dynamic-force-dynamic-page');

  const pageConfig = await page.$('#get-page-config');
  const pageConfigRow = await pageConfig?.textContent();
  // locally it returns also revalidate: 0, but in github actions nope
  expect(pageConfigRow && JSON.parse(pageConfigRow)).toMatchObject({ basePath: "", dynamic: 'force-dynamic', pagePath: `/dynamic/force-dynamic/page` });
});
