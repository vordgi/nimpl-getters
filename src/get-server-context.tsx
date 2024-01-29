import type { ServerContext } from './types';
import { serverGetterInClientComponentError } from './server-getter-in-client-component-error';

function getServerContext<T>({ _storage }: ServerContext<T>) {
    serverGetterInClientComponentError('getServerContext');

    return _storage.getStore();
}

export default getServerContext;
