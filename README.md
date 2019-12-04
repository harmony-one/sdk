[![npm version](https://img.shields.io/npm/v/@harmony-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@harmony-js/core)
[![Build Status](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core.svg?branch=master)](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core)


1. [About this SDK](#about-this-sdk)
2. [How to Install](#how-to-install)
   1. [Enviorment requirement](#enviorment-requirement)
   2. [Install from npm/yarn](#install-from-npmyarn)
   3. [Quick start](#quick-start)
3. [Build from source files](#build-from-source-files)
   1. [Install `lerna` and `typescript` globally](#install-lerna-and-typescript-globally)
   2. [Bootstrap and build](#bootstrap-and-build)
   3. [Bundle](#bundle)
4. [Tests](#tests)
   1. [Unit tests](#unit-tests)
   2. [e2e tests](#e2e-tests)
5. [More examples](#more-examples)
6. [Release Note](#release-note)
   1. [Before Release](#before-release)
   2. [Publish to npm using `dev:publish`](#publish-to-npm-using-devpublish)
   3. [Publish to npm with `lerna`](#publish-to-npm-with-lerna)

# About this SDK

A Harmony's blockchain javascript library, which provides an easier way to interact with Harmony's blockchain.

This libraries contains a few packages.

1. [@harmony-js/core](https://github.com/harmony-one/sdk/tree/master/packages/harmony-core)
2. [@harmony-js/account](https://github.com/harmony-one/sdk/tree/master/packages/harmony-account)
3. [@harmony-js/crypto](https://github.com/harmony-one/sdk/tree/master/packages/harmony-crypto)
4. [@harmony-js/network](https://github.com/harmony-one/sdk/tree/master/packages/harmony-network)
5. [@harmony-js/utils](https://github.com/harmony-one/sdk/tree/master/packages/harmony-utils)
6. [@harmony-js/transaction](https://github.com/harmony-one/sdk/tree/master/packages/harmony-transaction)
7. [@harmony-js/contract](https://github.com/harmony-one/sdk/tree/master/packages/harmony-contract)
8. [@harmony-js/staking](https://github.com/harmony-one/sdk/tree/master/packages/harmony-contract)


# How to Install

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

## Quick start

1. You need Harmony local testnet running.
   instruction here:[harmony-one/harmony](https://github.com/harmony-one/harmony)
2. Run this example under nodejs enviorment.

```javascript
// import or require Harmony class
const { Harmony } = require('@harmony-js/core');

// import or require settings
const { ChainID, ChainType } = require('@harmony-js/utils');

// 1. initialize the Harmony instance

const harmony = new Harmony(
  // rpc url
  'http://localhost:9500',
  {
    // chainType set to Harmony
    chainType: ChainType.Harmony,
    // chainType set to HmyLocal
    chainId: ChainID.HmyLocal,
  },
);

// 2. get wallet ready
// specify the privateKey
const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
// add privateKey to wallet
const sender = harmony.wallet.addByPrivateKey(privateKey);

// 3. get sharding info
async function setSharding() {
  // Harmony is a sharded blockchain, each endpoint have sharding structure,
  // However sharding structure is different between mainnet, testnet and local testnet
  // We need to get sharding info before doing cross-shard transaction
  const res = await harmony.blockchain.getShardingStructure();
  harmony.shardingStructures(res.result);
}

// 4. get transaction payload ready

async function transfer() {
  // run set sharding first, if you want to make a cross-shard transaction
  await setSharding();

  const txn = harmony.transactions.newTx({
    //  token send to
    to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
    // amount to send
    value: '10000',
    // gas limit, you can use string
    gasLimit: '210000',
    // send token from shardID
    shardID: 0,
    // send token to toShardID
    toShardID: 0,
    // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
    gasPrice: new harmony.utils.Unit('100').asGwei().toWei(),
  });

  // sign the transaction use wallet;

  const signedTxn = await harmony.wallet.signTransaction(txn);

  // Now you can use `Transaction.observed()` to listen events

  signedTxn
    .observed()
    .on('transactionHash', (txnHash) => {
      console.log('');
      console.log('--- hash ---');
      console.log('');
      console.log(txnHash);
      console.log('');
    })
    .on('receipt', (receipt) => {
      console.log('');
      console.log('--- receipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('cxReceipt', (receipt) => {
      console.log('');
      console.log('--- cxReceipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('error', (error) => {
      console.log('');
      console.log('--- error ---');
      console.log('');
      console.log(error);
      console.log('');
    });

  // send the txn, get [Transaction, transactionHash] as result

  const [sentTxn, txnHash] = await signedTxn.sendTransaction();

  // to confirm the result if it is already there

  const confiremdTxn = await sentTxn.confirm(txnHash);

  // if the transactino is cross-shard transaction
  if (!confiremdTxn.isCrossShard()) {
    if (confiremdTxn.isConfirmed()) {
      console.log('--- Result ---');
      console.log('');
      console.log('Normal transaction');
      console.log(`${txnHash} is confirmed`);
      console.log('');
      process.exit();
    }
  }
  if (confiremdTxn.isConfirmed() && confiremdTxn.isCxConfirmed()) {
    console.log('--- Result ---');
    console.log('');
    console.log('Cross-Shard transaction');
    console.log(`${txnHash} is confirmed`);
    console.log('');
    process.exit();
  }
}

transfer();

```



# Build from source files

## Install `lerna` and `typescript` globally

```bash
yarn global add lerna && yarn global add typescript
```
## Bootstrap and build

```bash
yarn bootstrap
```

## Bundle

build `umd` and `esm` version javascript for each sub-packages, which can be accessed by `import` or `require`

```bash 
yarn dist
```
All files are exported in `packages/dist` folder, use `**.esm.js` or `**.umd.js` format


# Tests
## Unit tests
```bash
yarn test:src
```
## e2e tests
**Contantly updating now, please get back later**

1. edit `.env` file if you have custom setting
   
2. run harmony node locally, follow this instruction : https://github.com/harmony-one/harmony)
   
3. wait for 1-2 mins, and run this:

```bash
yarn build && yarn test:e2e
```



# More examples

* [dapp-examples](https://github.com/harmony-one/dapp-examples)


# Release Note
## Before Release
1. Build source first
   ```bash
    yarn build:ts
   ```
2. Run unit tests
   ```bash
   yarn test:src
   ```
3. Run e2e tests
   ```bash
   yarn test:e2e
   ```
4. Clean and build bundle
   ```bash
   yarn dist
   ```
## Publish to npm using `dev:publish`

The packages is to be published to npm, using `@next` tag using script in `package.json`

Follow steps below to publish a npm verion using `@next` tag

1. Commit all changes to github master
2. Run publish script
   
```bash
  yarn dev:publish
```

3. Select version and confirm all prompts with `Y`
4. See version changes in `npmjs.com`

This will not change the release version of current npm packages(currently 0.0.7), developers have to use `@next` to install from npm.

For example.

```bash
  npm install @harmony-js/core@next
```



## Publish to npm with `lerna`

Follow steps below to publish a npm verion with latest version

1. Commit all changes to github master
2. Run `lerna publish`, `lerna` is required globally.
   
```bash
  lerna publish
```
3. Select version and confirm all prompts with `Y`
4. See version changes in `npmjs.com`

This will change the release version of current npm packages to the latest version, developers can install from npm directly

For example.

```bash
  npm install @harmony-js/core
```






