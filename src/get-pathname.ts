import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage.external'
import { hasBasePath } from 'next/dist/client/has-base-path'
import { removeBasePath } from 'next/dist/client/remove-base-path'
import { serverGetterInClientComponentError } from './server-getter-in-client-component-error'

export function getPathname() {
  serverGetterInClientComponentError('getPathname')

  const store = staticGenerationAsyncStorage.getStore()

  if (!store) return null

  const { urlPathname } = store
  const url = new URL(urlPathname, 'http://n')

  const pathname = hasBasePath(url.pathname)
    ? removeBasePath(url.pathname)
    : url.pathname

  return pathname
}