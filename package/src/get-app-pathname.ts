import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { serverGetterInClientComponentError } from "./server-getter-in-client-component-error";

export function getAppPathname() {
    serverGetterInClientComponentError("getAppPathname");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageStore = workUnitAsyncStorage.getStore() as any;
    const pageTags = pageStore.implicitTags.filter((tag: string) => tag.startsWith("_N_T_/"));
    const pathnameTag = pageTags[pageTags.length - 1];
    return pathnameTag.substring(5);
}
