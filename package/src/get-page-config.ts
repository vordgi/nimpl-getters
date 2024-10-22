import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { serverGetterInClientComponentError } from "./server-getter-in-client-component-error";

export const getPageConfig = () => {
    serverGetterInClientComponentError("getPageConfig");

    const store = workAsyncStorage.getStore();

    if (!store) return {};

    const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
    const { page, forceDynamic, forceStatic, dynamicShouldError } = store || {};
    let dynamic = "auto";
    if (forceDynamic) {
        dynamic = "force-dynamic";
    } else if (forceStatic) {
        dynamic = "force-static";
    } else if (dynamicShouldError) {
        dynamic = "error";
    }

    return { pagePath: page, dynamic, basePath };
};
