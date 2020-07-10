# Harmony JavaScript API

[![npm version](https://img.shields.io/npm/v/@harmony-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@harmony-js/core)
[![Build Status](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core.svg?branch=master)](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core)

This is the Harmony javascript library which provides an easier way to interact with Harmony's blockchain.

This libraries contains a few packages.

1. [@harmony-js/core](https://github.com/harmony-one/sdk/tree/master/packages/harmony-core)
2. [@harmony-js/account](https://github.com/harmony-one/sdk/tree/master/packages/harmony-account)
3. [@harmony-js/crypto](https://github.com/harmony-one/sdk/tree/master/packages/harmony-crypto)
4. [@harmony-js/network](https://github.com/harmony-one/sdk/tree/master/packages/harmony-network)
5. [@harmony-js/utils](https://github.com/harmony-one/sdk/tree/master/packages/harmony-utils)
6. [@harmony-js/transaction](https://github.com/harmony-one/sdk/tree/master/packages/harmony-transaction)
7. [@harmony-js/contract](https://github.com/harmony-one/sdk/tree/master/packages/harmony-contract)
8. [@harmony-js/staking](https://github.com/harmony-one/sdk/tree/master/packages/harmony-contract)

# Installation

This library works on both nodejs and browser. Please use it according to your use case.

## Enviorment requirement

* Nodejs: 10.0+
* Browser: Latest Chrome and Firefox

## Install from npm/yarn

**Note: we added a @next tag to npm package, please use the following command to install with npm/yarn**

```bash

# npm
npm install @harmony-js/core@next 

# yarn
yarn add @harmony-js/core@next

# tslib is required, we'd better install it as well
npm install tslib
yarn add tslib

```

# Building from source files

## Install `lerna` and `typescript` globally

```bash
yarn global add lerna && yarn global add typescript
```
## Bootstrap and build

```bash
yarn bootstrap
```

## Bundle

Build `umd` and `esm` version javascript for each sub-packages, which can be accessed by `import` or `require`

```bash 
yarn dist
```
All files are exported in `packages/dist` folder, use `**.esm.js` or `**.umd.js` format


# Running Tests
## Unit tests
```bash
yarn test:src
```
## e2e tests

1. `.env` file defines configuration, edit if you have custom settings
   
2. Run harmony node locally, follow the instructions: https://github.com/harmony-one/harmony
   
3. Wait for 1-2 mins, and run this:

```bash
yarn build && yarn test:e2e
```




