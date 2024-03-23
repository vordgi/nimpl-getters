# get-search-params [deprecated]

Getter was deprecated in version 1.2.0 because in some cases next.js can strip query parameters from the stored URL.

## Possible implementation

Add URL header in middleware

```ts
// middleware.ts
import { NextResponse } from 'next/server';
 
export function middleware(request: Request) {
  const next = NextResponse.next();
  next.headers.set('x-url', request.url);

  return next;
}
```

Use new header

```ts
import { headers } from 'next/headers';
import { getPageConfig } from 'next-impl-getters/get-page-config';

export default function Component() {
    const { dynamic } = getPageConfig();

    if (dynamic === 'force-dynamic') {
        const url = headers().get('x-url') || '';
        const { searchParams } = new URL(url, 'http://n');
    }
}
```

## Previous solution

**This implementation will be completely removed from the package**


*Uses next.js functionality*

Retrieves search-params for the current page request

```tsx
import { getSearchParams } from 'next-impl-getters/get-search-params'

export default function Component() {
    const searchParams = getSearchParams()

    const source = searchParams.get('source')

    return (
        // ...
    )
}
```

Because the getter works on every request, the dynamic page parameter must be set to dynamic (*not static*) for it to work.

If the page has the `dynamic='force-static'` or `dynamic='error'` option specified, the getter will throw an error. If this option is not specified, it will output a warning. It is recommended to specify force-dynamic:

```tsx
// app/**/page.tsx
export const dynamic = 'force-dynamic'
```

If you are sure you want to ignore the logic with checking the dynamic option - pass `{ ignoreDynamicOptionErrors: true }` as the first argument in the getter.

```tsx
const searchParams = getSearchParams({ ignoreDynamicOptionErrors: true })
```