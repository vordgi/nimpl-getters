import { test, expect } from "@playwright/test";

const variants = [
  { path: '', id: '#home-page', namespace: 'default' },
  { path: '/dynamic/auto', id: '#dynamic-auto-page', namespace: 'dynamic-auto' },
  { path: '/dynamic/error', id: '#dynamic-error-page', namespace: 'dynamic-error' },
  { path: '/dynamic/force-static', id: '#dynamic-force-static-page', namespace: 'dynamic-force-static' },
  { path: '/dynamic/force-dynamic', id: '#dynamic-force-dynamic-page', namespace: 'dynamic-force-dynamic' },
]

test.describe('Should work in server pages', async () => {
  for (const variant of variants) {
    test(`should return correct values on "${variant.path}" page by default`, async ({ page }) => {
      await page.goto(variant.path);
      page.waitForSelector(variant.id);

      const pathname = await page.$('#get-pathname');
      expect(await pathname?.textContent()).toBe(variant.path || '/');

      const params = await page.$('#get-params');
      const paramsRow = await params?.textContent();
      expect(paramsRow && JSON.parse(paramsRow)).toEqual({});

      const searchParams = await page.$('#get-search-params');
      expect(await searchParams?.textContent()).toBe("");
    });

    test(`should return default context on "${variant.path}" page by default`, async ({ page }) => {
      await page.goto(variant.path);
      page.waitForSelector(variant.id);

      const serverContext = await page.$('#get-server-context');
      const serverContextRow = await serverContext?.textContent();
      expect(serverContextRow && JSON.parse(serverContextRow)).toEqual({ namespace: variant.namespace });
    });
  }
})
