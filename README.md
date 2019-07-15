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

# Packages

1. [@harmony-js/core](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-core)
2. [@harmony-js/account](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-account)
3. [@harmony-js/crypto](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-crypto)
4. [@harmony-js/network](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-network)
5. [@harmony-js/utils](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-utils)
6. [@harmony-js/transaction](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-transaction)
7. [@harmony-js/contract](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-contract)


# Manually Build
1. make sure you have latest `node.js` and `yarn` installed

2. git clone
   
   ```bash
   git clone git@github.com:FireStack-Lab/Harmony-sdk-core.git
   cd Harmony-sdk-core
   ```

3. cleanup and build
   
   ```bash
   yarn global add lerna && yarn install && lerna bootstrap && lerna link && yarn dist
   ```


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


