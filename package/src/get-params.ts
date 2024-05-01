import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";
import { normalizeInterceptingRoutes, normalizePagePath, normalizePathname, parseSegments } from "./utils";
import { serverGetterInClientComponentError } from "./server-getter-in-client-component-error";

export const getParams = () => {
    serverGetterInClientComponentError("getParams");

    const store = staticGenerationAsyncStorage.getStore();

    if (!store) return {};

    const { urlPathname, pagePath = "/" } = store;

    const cleanUrlPathname = normalizePathname(urlPathname);
    const cleanPagePath = normalizePagePath(pagePath);
    const pagePathParts = cleanPagePath.split("/");
    const pagePathInterceptedParts = normalizeInterceptingRoutes(pagePathParts);
    const pathnameParts = cleanUrlPathname.split("/");

    const isNotFoundPage = pagePath.match(/\/_not-found\/?$/);
    const isValidCatchALl =
        cleanPagePath.match(/\/\[\.\.\.[^\]]+\]/) && pathnameParts.length >= pagePathInterceptedParts.length;
    const isValidOptionalCatchALl =
        cleanPagePath.match(/\/\[\[\.\.\.[^\]]+\]\]/) && pathnameParts.length >= pagePathInterceptedParts.length - 1;
    const isCorrectMatched =
        isNotFoundPage ||
        pagePathInterceptedParts.length === pathnameParts.length ||
        isValidCatchALl ||
        isValidOptionalCatchALl;

    if (!isCorrectMatched) {
        const createIssueUrl = new URL("https://github.com/vordgi/nimpl-getters/issues/new");
        createIssueUrl.searchParams.set("title", "Error parsing segments in get-params");
        createIssueUrl.searchParams.set("body", `urlPathname: \`${urlPathname}\`;\n\npagePath: \`${pagePath}\`;`);
        createIssueUrl.searchParams.append("labels", "bug");
        throw new Error(`Something went wrong. Please create an issue on Github: ${createIssueUrl}`);
    }

    const query = parseSegments(pagePathInterceptedParts, pathnameParts);
    return query;
};
