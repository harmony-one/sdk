# Harmony JavaScript SDK

[![npm version](https://img.shields.io/npm/v/@harmony-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@harmony-js/core)
[![Build Status](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core.svg?branch=master)](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core)

This is the Harmony Javascript SDK which provides an easier way to interact with Harmony blockchain.

Please read the [documentation](https://jssdk.doc.hmny.io/) for full API doc.

The SDK includes following packages with package-level documentation and examples inside each package.

1. [@harmony-js/core](https://github.com/harmony-one/sdk/tree/master/packages/harmony-core)
2. [@harmony-js/account](https://github.com/harmony-one/sdk/tree/master/packages/harmony-account)
3. [@harmony-js/crypto](https://github.com/harmony-one/sdk/tree/master/packages/harmony-crypto)
4. [@harmony-js/network](https://github.com/harmony-one/sdk/tree/master/packages/harmony-network)
5. [@harmony-js/utils](https://github.com/harmony-one/sdk/tree/master/packages/harmony-utils)
6. [@harmony-js/transaction](https://github.com/harmony-one/sdk/tree/master/packages/harmony-transaction)
7. [@harmony-js/contract](https://github.com/harmony-one/sdk/tree/master/packages/harmony-contract)
8. [@harmony-js/staking](https://github.com/harmony-one/sdk/tree/master/packages/harmony-staking)

# Examples

* [A Token Faucet Demo DApp](https://github.com/harmony-one/token-faucet-demo-dapp)
* [Hackathon DApps](https://docs.harmony.one/home/showcases/applications): DApps built during our internal hackathon
  * [soccerplayers](https://github.com/gupadhyaya/soccerplayers), [onemoji](https://github.com/peekpi/onemoji), [harmonauts](https://github.com/ivorytowerdds/harmonauts), [good-one](https://github.com/harmony-one/dapp-demo-crowdfunding)
* [Cross-chain Apps](https://docs.harmony.one/home/showcases/crosschain) [the link contains code, demo, and more information]
* [DeFi Apps](https://docs.harmony.one/home/showcases/defi)
* [DevPost Hackathon Apps](https://docs.harmony.one/home/showcases/hackathons)
* Eth<>Harmony Bridge Components: [frontend](https://github.com/harmony-one/ethhmy-bridge.frontend), [backend](https://github.com/harmony-one/ethhmy-bridge.appengine), [smart contracts](https://github.com/harmony-one/ethhmy-bridge), [test scripts](https://github.com/harmony-one/ethhmy-bridge.tests)
* Eth<>Harmony bridge SDKs: [main sdk](https://github.com/harmony-one/ethhmy-bridge.sdk), [bridge UI widget](https://github.com/harmony-one/ethhmy-bridge.ui-sdk)
* Swoop Dex: [interface](https://github.com/harmony-one/swoop-interface), [cli](https://github.com/harmony-one/swoop-cli), [sdk](https://github.com/harmony-one/swoop-sdk), [deployment](https://github.com/harmony-one/swoop-deployment), [misc](https://github.com/harmony-one/swoop-misc), [lib](https://github.com/harmony-one/swoop-lib), [periphery](https://github.com/harmony-one/swoop-periphery), [core](https://github.com/harmony-one/swoop-core), [testing](https://github.com/harmony-one/swoop-testing), [utils](https://github.com/harmony-one/swoop-utils)
* [Iris Bridge](https://github.com/harmony-one/ethhmy-bridge-v2): inspired from near's rainbow bridge
* [Animoca's BeastQuest Game](https://github.com/harmony-one/BeastQuest)
* [Chainlink Testnet Integration Demo](https://github.com/harmony-one/chainlink-demo-project)
* [NFT Store DApp](https://github.com/harmony-one/nft-store)
* [old dapp-examples](https://github.com/harmony-one/dapp-examples): some of them may be outdated!


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

1. Remove the `'cross-fetch': 'jest-fetch-mock'` line from `scripts/jest/jest.e2e.config.js`
1. Run harmony node locally, follow the instructions: https://github.com/harmony-one/harmony  
1. Wait for 1-2 mins, and run this:
```bash
yarn build && yarn test:e2e
```




