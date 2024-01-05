# Next Impl Getters

Repo for an example implementation of getters to retrieve page data in server-side components.

## Why is this repository needed?

Next.js has been reluctant for a long time (over two years [[task](https://github.com/vercel/next.js/issues/43704)]) to work on this issue, suggesting the use of client-side components. The community mainly uses headers and middleware, thereby disabling static optimization. Personally, in the projects I work on, I pass parameters through props (yes, on multiple levels) or use client-side components.

All existing solutions leave much to be desired.

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

## Current Getters

### get-pathname [stable]

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

### get-params [experimental]

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

## Additional

Please consider giving a star if you like it, it will help promote the implementation in the eyes of the next.js team.

Create tasks for identified issues, desired getters, or various improvements.