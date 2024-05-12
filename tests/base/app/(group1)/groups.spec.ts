import { test, expect } from "@playwright/test";

test("should return correct page params and pathname for nested groups", async ({ page }) => {
    await page.goto("/groups");
    page.waitForSelector("#groups-page");

    const pathname = await page.$("#get-pathname");
    const pathnameRow = await pathname?.textContent();
    expect(pathnameRow).toEqual("/groups");

    const params = await page.$("#get-params");
    const paramsRow = await params?.textContent();
    expect(paramsRow && JSON.parse(paramsRow)).toEqual({});
});

test("should return correct page params and pathname for intercepting route", async ({ page }) => {
    await page.goto("/intercepted");
    page.waitForSelector("#intercepted-page");

    const pathname = await page.$("#get-pathname");
    const pathnameRow = await pathname?.textContent();
    expect(pathnameRow).toEqual("/intercepted");

    const params = await page.$("#get-params");
    const paramsRow = await params?.textContent();
    expect(paramsRow && JSON.parse(paramsRow)).toEqual({});
});

test("should return correct page params and pathname for intercepted route", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#home-page");
    page.click("#to-intercepted");
    await page.waitForSelector("#intercepted-page");

    const pathname = await page.$("#intercepted-get-pathname");
    const pathnameRow = await pathname?.textContent();
    expect(pathnameRow).toEqual("/intercepted");

    const params = await page.$("#intercepted-get-params");
    const paramsRow = await params?.textContent();
    expect(paramsRow && JSON.parse(paramsRow)).toEqual({});
});

test("should return correct page params and pathname for nested intercepted route", async ({ page }) => {
    await page.goto("/nested");
    await page.waitForSelector("#nested-page");
    page.click("#to-nested-intercepted");
    await page.waitForSelector("#nested-intercepted-page");

    const pathname = await page.$("#intercepted-get-pathname");
    const pathnameRow = await pathname?.textContent();
    expect(pathnameRow).toEqual("/nested-intercepted");

    const params = await page.$("#intercepted-get-params");
    const paramsRow = await params?.textContent();
    expect(paramsRow && JSON.parse(paramsRow)).toEqual({});
});
