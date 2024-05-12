import { test, expect } from "@playwright/test";

const variants = [
    { path: "", id: "#home-page" },
    { path: "/dynamic/auto", id: "#dynamic-auto-page" },
    { path: "/dynamic/error", id: "#dynamic-error-page" },
    { path: "/dynamic/force-static", id: "#dynamic-force-static-page" },
    { path: "/dynamic/force-dynamic", id: "#dynamic-force-dynamic-page" },
];

test.describe("Should work in server pages", async () => {
    for (const variant of variants) {
        test(`should return correct values on "${variant.path}" page by default`, async ({ page }) => {
            await page.goto(variant.path);
            page.waitForSelector(variant.id);

            const pathname = await page.$("#get-pathname");
            expect(await pathname?.textContent()).toBe(variant.path || "/");

            const params = await page.$("#get-params");
            const paramsRow = await params?.textContent();
            expect(paramsRow && JSON.parse(paramsRow)).toEqual({});

            const searchParams = await page.$("#get-search-params");
            expect(await searchParams?.textContent()).toBe("");
        });
    }
});
