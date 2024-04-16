import type { ServerContext } from "./types";
import { AsyncLocalStorage } from "async_hooks";
import { serverGetterInClientComponentError } from "./server-getter-in-client-component-error";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Enter = ({ storage, value }: { storage: AsyncLocalStorage<{ value: unknown }>; value: unknown }) => {
    storage.enterWith({ value });
    return <></>;
};

function createServerContext<T>(defaultValue?: T): ServerContext<T> {
    serverGetterInClientComponentError("createServerContext");

    const storage: ServerContext<T>["_storage"] = new AsyncLocalStorage<{ value: T }>();

    return {
        Provider: async ({ children, value }) => {
            return (
                <>
                    <Enter storage={storage} value={value} />
                    {children}
                </>
            );
        },
        Consumer: ({ children }) => {
            const store = storage.getStore();
            return children(store ? store.value : defaultValue);
        },
        _storage: storage,
        _defaultValue: defaultValue,
    };
}

export default createServerContext;
