[![npm version](https://img.shields.io/npm/v/@harmony-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@harmony-js/core)


# Harmony-SDK-Core

A Harmony's blockchain javascript library

It's a mono-repo library, not yet published to npm.


# Install from npm/yarn

```bash

# npm
npm install @harmony-js/core@next 

# yarn
yarn add @harmony-js/core@next

# tslib may be required, we'd better install it as well
npm install tslib
yarn add tslib

```

# Start hacking

1. install `lerna` and `typescript` globally
```bash
yarn global add lerna && yarn global add typescript
```
2. bootstrap repostory
```bash
yarn bootstrap

```


# Packages

1. [@harmony-js/core](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-core)
2. [@harmony-js/account](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-account)
3. [@harmony-js/crypto](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-crypto)
4. [@harmony-js/network](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-network)
5. [@harmony-js/utils](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-utils)
6. [@harmony-js/transaction](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-transaction)
7. [@harmony-js/contract](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-contract)


# Manually Build/bundle

There are two ways building

1. building the `es5` version bundled javascript for each sub-packages, which can be run in Browser directly.

    ```bash
    yarn dist
    ```
    All files are exported in `/dist` folder

2. build `umd` and `esm` version javascript for each sub-packages, which can be accessed by `import` or `require`

    ```bash 
    yarn bundle
    ```
    All files are exported in `packages/dist` folder, use `**.esm.js` or `**.umd.js` format

# Examples

* [harmony-sdk-examples](https://github.com/FireStack-Lab/harmony-sdk-examples)


# E2E tests

**Contantly updating now, please get back later**

1. edit `.env` file if you have custom setting
2. run harmony node locally(this fork currently : https://github.com/mikedoan/harmony/tree/enable_tx)
3. wait for 1-2 mins, and run this:

```bash
yarn build:ts && yarn test:e2e
```


