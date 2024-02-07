import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage.external'
import { serverGetterInClientComponentError } from './server-getter-in-client-component-error'

export const getPageConfig = () => {
  serverGetterInClientComponentError('getPageConfig');

  const store = staticGenerationAsyncStorage.getStore();

  if (!store) return {};

  const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';
  const { pagePath, forceDynamic, forceStatic, dynamicShouldError, revalidate } = store || {};
  let dynamic = 'auto';
  if (forceDynamic) {
    dynamic = 'force-dynamic';
  } else if (forceStatic) {
    dynamic = 'force-static';
  } else if (dynamicShouldError) {
    dynamic = 'error';
  }

  return { pagePath, dynamic, revalidate, basePath };
}
