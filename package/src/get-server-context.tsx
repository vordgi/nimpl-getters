import type { ServerContext } from "./types";
import { serverGetterInClientComponentError } from "./server-getter-in-client-component-error";

function getServerContext<T>({ _storage, _defaultValue }: ServerContext<T>) {
    serverGetterInClientComponentError("getServerContext");

    const store = _storage.getStore();

    if (!store) return _defaultValue;

    return store.value;
}

export default getServerContext;
