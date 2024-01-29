import type { ServerContext } from './types';
import { AsyncLocalStorage } from 'async_hooks';
import { serverGetterInClientComponentError } from './server-getter-in-client-component-error';

function createServerContext<T>(): ServerContext<T> {
    serverGetterInClientComponentError('createServerContext');

    const storage = new AsyncLocalStorage<T>();

    return {
        Provider: ({ children, value }) => {
            storage.enterWith(value);
            return children;
        },
        Consumer: ({ children }) => children(storage.getStore()),
        _storage: storage,
    }
}

export default createServerContext;
