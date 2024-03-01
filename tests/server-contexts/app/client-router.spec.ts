import { test, expect } from "@playwright/test";

// to-after
// to-inside
// to-uninitialized

test.describe('Should work correct in client router', async () => {
  test(`should return correct values on "after" page by default`, async ({ page }) => {
    await page.goto('/');
    await page.click('#to-after');
    await page.waitForSelector('#after-page');
    await page.waitForSelector('#context-first-value');

    const firstValue = await page.$('#context-first-value');
    expect(await firstValue?.textContent()).toBe('first value');

    const secondValue = await page.$('#context-second-value');
    expect(await secondValue?.textContent()).toBe('second value');
  });

  test(`should return correct values on "inside" page by default`, async ({ page }) => {
    await page.goto('/');
    await page.click('#to-inside');
    await page.waitForSelector('#inside-page');
    await page.waitForSelector('#context-first-value');

    const firstValue = await page.$('#context-first-value');
    expect(await firstValue?.textContent()).toBe('first value');

    const secondValue = await page.$('#context-second-value');
    expect(await secondValue?.textContent()).toBe('second value');
  });

  test(`should return correct values on "uninitialized" page by default`, async ({ page }) => {
    await page.goto('/');
    await page.click('#to-uninitialized');
    await page.waitForSelector('#uninitialized-page');
    await page.waitForSelector('#context-first-value');

    const firstValue = await page.$('#context-first-value');
    expect(await firstValue?.textContent()).toBe('first value');

    const secondValue = await page.$('#context-second-value');
    expect(await secondValue?.textContent()).toBe('default value');
  });
})
