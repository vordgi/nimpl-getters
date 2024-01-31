import type { ServerContext } from './types';
import { AsyncLocalStorage } from 'async_hooks';
import { serverGetterInClientComponentError } from './server-getter-in-client-component-error';

function createServerContext<T>(defaultValue?: T): ServerContext<T> {
    serverGetterInClientComponentError('createServerContext');

    const storage = new AsyncLocalStorage<{ value: T }>();

    return {
        Provider: ({ children, value }) => {
            storage.enterWith({ value });
            return children;
        },
        Consumer: ({ children }) => {
            const store = storage.getStore();
            return children(store ? store.value : defaultValue);
        },
        _storage: storage,
        _defaultValue: defaultValue,
    }
}

export default createServerContext;
