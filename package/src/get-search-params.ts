import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage.external'
import { serverGetterInClientComponentError } from './server-getter-in-client-component-error'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { stripInternalSearchParams } from 'next/dist/server/internal-utils'

/** @deprecated getSearchParams is deprecated. [Read more](https://nimpl.tech/getters/current-getters/get-search-params) */
export function getSearchParams(opts?: { ignoreDynamicOptionErrors?: boolean }) {
  serverGetterInClientComponentError('getSearchParams')
  console.error('getSearchParams is deprecated. Read more - https://nimpl.tech/getters/current-getters/get-search-params')

  const store = staticGenerationAsyncStorage.getStore()

  if (!store) return new URLSearchParams()

  const { urlPathname, forceStatic, forceDynamic, dynamicShouldError } = store

  if (!opts?.ignoreDynamicOptionErrors) {
    if (forceStatic) {
      throw new Error('Сannot get client search parameters with dynamic=force-static setting')
    } else if (dynamicShouldError) {
      throw new Error('Сannot get client search parameters with dynamic=error setting')
    } else if (!forceDynamic) {
      console.warn('Do not use getSearchParams with unselected dynamic setting, use force-dynamic instead')
    }
  }

  const url = new URL(urlPathname, 'http://n')
  const strippedUrl = stripInternalSearchParams(url, true)
  const readonlySearchParams = new ReadonlyURLSearchParams(strippedUrl.searchParams)

  return readonlySearchParams
}
