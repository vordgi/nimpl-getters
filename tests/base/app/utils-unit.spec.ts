import { test, expect } from "@playwright/test";
import { parseParams, INVALID_PARSE } from "@nimpl/getters/utils";

test.describe("Test utils", () => {
    test(`test parseParams`, () => {
        expect(parseParams("/", "/page")).toEqual({});
        expect(parseParams("/", "/[slug]/page")).toBe(INVALID_PARSE);
        expect(parseParams("/example/", "/[slug]/page")).toEqual({ slug: "example" });
        expect(parseParams("/example/multiple/", "/[slug]/page")).toBe(INVALID_PARSE);
        expect(parseParams("/example/multiple/", "/[slug]/(group)/multiple/page")).toEqual({ slug: "example" });
        expect(parseParams("/example/multiple/", "/[...segments]/page")).toEqual({ segments: ["example", "multiple"] });
        expect(parseParams("/", "/[[...segments]]/page")).toEqual({});
        expect(parseParams("/intercepted/", "/example/multiple/(..)(..)intercepted/page")).toEqual({});
    });
});
