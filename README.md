# Next Impl Getters

Implementation of server getters for working with data in React Server Components without switching to SSR.

Before using the library, read the [Possible Issues](#possible-issues)

## Installation

**Using npm:**
```bash
npm i next-impl-getters
```

**Using yarn:**
```bash
yarn add next-impl-getters
```

## Current Getters

### get-pathname [stable]

*Uses next.js functionality*

The getter almost fully utilizes Next.js functionality and is awaiting [PR](https://github.com/vercel/next.js/pull/59909) merging.

```tsx
import { getPathname } from 'next-impl-getters/get-pathname'

export default function Component() {
    const pathname = getPathname()

    return (
        // ...
    )
}
```

### Server contexts [beta]

*Uses only node.js and react.js functionality*

Familiar React contexts, but working fully on the server

1\. **Initialize the context**
```tsx
// ./ExampleContext.ts
import createServerContext from "next-impl-getters/create-server-context"

export const ExampleContext = createServerContext<{ data: string }>()
```

2\. **Transfer the data to the provider**
```tsx
// ./ParentComponent.ts
import { ExampleContext } from "./ExampleContext"
import ChildComponent from "./ChildComponent"

export default function ParentComponent() {
    return (
        <ExampleContext.Provider value={{ data: 'test' }}>
            <ChildComponent />
        </ExampleContext.Provider>
    )
}
```

3\. **Get context data**
```tsx
// ./ChildComponent.ts
import getServerContext from "next-impl-getters/get-server-context"
import { ExampleContext } from "./ExampleContext"

export default function ChildComponent() {
    const context = getServerContext(ExampleContext)

    return (
        <div>
            {context?.data}
        </div>
    )
}
```

3\.1. **You can also use a consumer to get context data**
```tsx
// ./ParentComponent.ts
import { ExampleContext } from "./ExampleContext"
import ChildComponent from "./ChildComponent"

export default function ParentComponent() {
    return (
        <ExampleContext.Provider value={{ data: 'test' }}>
            <ExampleContext.Consumer>
                {(data) => {
                    //...
                    return <ChildComponent />
                }}
            </ExampleContext.Consumer>
        </ExampleContext.Provider>
    )
}
```

### get-search-params [beta]

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

### get-page-config [beta]

*Uses next.js functionality*

Retrieves page config for the currently rendered page

```tsx
import { getPageConfig } from 'next-impl-getters/get-page-config'
// ...

export default function Component() {
    const { basePath, dynamic, pagePath, revalidate } = getPageConfig()

    // getters are not hooks, so you can use them inside conditions
    if (dynamic === 'force-dynamic') {
        const searchParams = getSearchParams()
        // ...
    }

    return (
        // ...
    )
}
```

### get-params [experimental]

*Uses next.js functionality*

Retrieves parameters for the current page.

This is a more complex function that essentially (not quite) gathers parameters from the file path of the current page and the path of the page. Next.js does not have ready-made functionality for this. Currently, Next.js determines the parameters for segments during the tree building process from top to bottom.

On the one hand, I like the idea of adding this capability to the library, I think it can be useful, but still, it will be fundamentally different logic compared to adding parameters to page props and layers, so the solution is not straightforward and may be completely redesigned.

```tsx
import { getParams } from 'next-impl-getters/get-params'

export default function Component() {
    const params = getParams()

    return (
        // ...
    )
}
```

## Stability

All getters are covered with tests. Tests are run on every release and every 6 hours on the latest **Canary** version of `Next.js`.

In this way, you can be sure not only of the stability of the code, but also that if there is a breaking change in `Next.js`, this will immediately become known. *Even before the release of a stable version of `Next.js`.*

## Examples

You can see examples in the [directory](https://github.com/vordgi/next-impl-getters/tree/main/examples) of the repository.

## Possible Issues

As a potential risk of a server-side solution, the problem of Layouts is mentioned, that they do not rebuild, which is inherent in the app router foundation. I don't see any reason to change this logic.

The most reliable approach, in my opinion, is to output messages to the console or even throw an error when this function is used in Layout or Error without the necessary conditions.

So far, I haven't found a way to track in server-side components from which parent the component is being built.

If it is not possible to do this, I would simply allow the implementation of this functionality with an additional note in the documentation that Layout does not rebuild, so using this function in it is not recommended.

The problem with Layouts will also arise with the emergence of server-side contexts, so a solution to prohibit certain methods in it or simply recommend not using them is inevitable.

## What's next?

The repository has been created while waiting for possible revisions and [PR](https://github.com/vercel/next.js/pull/59909) merging - for testing and collecting suggestions.

Why getters instead of extending existing hooks?

I'm not very fond of the idea of extending hooks - on the server, it won't be a hook no matter how you look at it. These are specifically getters. Moreover, a client-side hook can be synchronous, while a server-side getter for the same task can be asynchronous, making it a more versatile format.

## Additional

Please consider giving a star if you like it, it will help promote the implementation in the eyes of the next.js team.

Create tasks for identified issues, desired getters, or various improvements.

## See also

[next-impl-config](https://github.com/vordgi/next-impl-config) — next.js essentially works in 4 environments — build, server, client and edge, with configuration described only for two of them — build and server. This package gives the opportunity to add settings for each possible environment.

[next-classnames-minifier](https://github.com/vordgi/next-classnames-minifier) — due to the peculiarities of caching next.js it is difficult to configure class compression to symbols (.a, .b, …, .a1) and to solve this task this package was made, which was dedicated to the recent article.

[next-translation](https://github.com/vordgi/next-translation) — package designed primarily with server components in mind and maximum optimization (due to the transfer of logic to the assembly stage and/or server side).
