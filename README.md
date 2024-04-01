# @nimpl/getters

Implementation of server getters for working with data in React Server Components without switching to SSR.

Before using the library, read the [Possible Issues](https://nimpl.tech/getters/possible-issues)

## Installation

**Using npm:**
```bash
npm i @nimpl/getters
```

**Using yarn:**
```bash
yarn add @nimpl/getters
```

## Current Getters

* [get-pathname](https://nimpl.tech/getters/current-getters/get-pathname)
* [server-contexts](https://nimpl.tech/getters/current-getters/server-contexts)
* [get-page-config](https://nimpl.tech/getters/current-getters/get-page-config)
* [get-params](https://nimpl.tech/getters/current-getters/get-params)
* [get-search-params](https://nimpl.tech/getters/current-getters/get-search-params)

## Stability

All getters are covered with tests. Tests are run on every release and every 6 hours on the latest **Canary** version of `Next.js`.

In this way, you can be sure not only of the stability of the code, but also that if there is a breaking change in `Next.js`, this will immediately become known. *Even before the release of a stable version of `Next.js`.*

## Examples

You can see examples in the [directory](https://github.com/vordgi/nimpl-getters/tree/main/examples) of the repository.

## Additional

Please consider giving a star if you like it, it will help promote the implementation in the eyes of the next.js team.

Create tasks for identified issues, desired getters, or various improvements.
