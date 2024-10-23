import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { hasBasePath } from "next/dist/client/has-base-path";
import { removeBasePath } from "next/dist/client/remove-base-path";
import { serverGetterInClientComponentError } from "./server-getter-in-client-component-error";
import { normalizeInterceptingRoutes } from "./utils";

export function getPathname() {
    serverGetterInClientComponentError("getPathname");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageStore = workUnitAsyncStorage.getStore() as any;
    let originalPathname = pageStore?.url?.pathname;

    if (!originalPathname) {
        const pageConfigurationStore = workAsyncStorage.getStore();
        originalPathname =
            pageConfigurationStore?.route &&
            normalizeInterceptingRoutes(pageConfigurationStore.route.split("/")).join("/");
    }

    if (!originalPathname) {
        return null;
    }

    const url = new URL(originalPathname, "http://n");
    const pathname = hasBasePath(url.pathname) ? removeBasePath(url.pathname) : url.pathname;

    return pathname;
}
