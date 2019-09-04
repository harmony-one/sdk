[![npm version](https://img.shields.io/npm/v/@harmony-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@harmony-js/core)
[![Build Status](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core.svg?branch=master)](https://travis-ci.com/FireStack-Lab/Harmony-sdk-core)

# Harmony-SDK-Core

A Harmony's blockchain javascript library

It's a mono-repo library, not yet published to npm.


# Install from npm/yarn

**Note: we added a @next tag to npm package, please use the following command to install with npm/yarn**

```bash

# npm
npm install @harmony-js/core@next 

# yarn
yarn add @harmony-js/core@next

# tslib may be required, we'd better install it as well
npm install tslib
yarn add tslib

```
# Examples with tutorials

* [harmony-sdk-examples](https://github.com/FireStack-Lab/harmony-sdk-examples)

# Packages

1. [@harmony-js/core](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-core)
2. [@harmony-js/account](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-account)
3. [@harmony-js/crypto](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-crypto)
4. [@harmony-js/network](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-network)
5. [@harmony-js/utils](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-utils)
6. [@harmony-js/transaction](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-transaction)
7. [@harmony-js/contract](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-contract)

# Hacking from source files

1. install `lerna` and `typescript` globally (if you have these, you can skip)
```bash
yarn global add lerna && yarn global add typescript
```
2. bootstrap repostory
```bash
yarn install && yarn bootstrap
```
3. run watcher before editing any source file
```bash
yarn watch
```
4. if you are ready to build/test/bundle, please refer to the following section:
- [Build](#Build)
- [Bundle](#Bundle)
- [E2E Tests](#E2E-tests)


# Manually Build/bundle

## Build

```bash
yarn build

```

## Bundle

There are 2 ways bundling files.

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




# E2E tests

**Contantly updating now, please get back later**

1. edit `.env` file if you have custom setting
2. run harmony node locally(this fork currently : https://github.com/mikedoan/harmony/tree/enable_tx)
3. wait for 1-2 mins, and run this:

```bash
yarn build && yarn test:e2e
```


# Cross-Shard
```javascript
async function crossShard() {
  //  manually set the shardingStructure
  // 手动设置 sharding
  const shardingArray = [
    {
      shardID: 0,
      http: 'http://localhost:9500',
      ws: 'ws://localhost:9800',
    },
    {
      shardID: 1,
      http: 'http://localhost:9501',
      ws: 'ws://localhost:9801',
    },
  ];

  // get shardingStructure from rpc
  // 通过api获取sharding设置
  const res = await harmony.blockchain.getShardingStructure();
  if (res.result) {
    // if we can get from network use `harmony.shardingStructures` to set the structure to all sub module
    //如果网络获取成功，通过`harmony.shardingStructures`进行设置
    harmony.shardingStructures(res.result);
  } else {
    // or set it using local setting  
    // 否则加载本地的设置
    harmony.shardingStructures(shardingArray);
  }

  // each account should update it's own shard
  // 每个帐号更新自己的sharding
  await acc1.updateBalances();
  await acc2.updateBalances();

  // to get sharded address, the format goes `bech32-{shardID}`
  // 获得分片地址，返回格式为 `bech32-{shardID}`
  const from = acc1.getAddressFromShardID(0);
  const to = acc2.getAddressFromShardID(1);

  // use `getShardBalance(shardID:number)` to get balance in shardID 
  // 可以获得指定shard的余额
  acc1.getShardBalance(0).then(console.log);

  // you can print the sharding map for each account
  // 打印每个帐号的sharding结构
  console.log({ acc1: acc1.shards, acc2: acc2.shards });

  // now construct a ShardingTransaction, use `harmony.transactions.newTx(obj,true)`
  // because `from` and `to` here ,are sharded addresses, like `bech32-{shardID}`
  // you dont have to specify `shardID` and `toShardID`, it will handle it automatically.

  // 构建一个sharding transaction，注意，true这里需要标志好
  // 因为from，和 to已经被认定为带后缀的分片地址
  // 格式为`bech32-{shardID}`
  // 在这里不需要指定 shardID和toShardID了，因为这个txn会自动把 shardID和toShardID填进去
  const txn = harmony.transactions.newTx(
    {
      from,
      to,
      value: '10000',
      gasLimit: '210000',
      gasPrice: new harmony.utils.Unit('1000000000').asWei().toWei(),
    },
    true,
  );

  // now use acc1 to sign, it will use specific shardID to get the nonce of sharded address
  // 正常使用acc1进行签名，这里会自动根据shardID来取指定分片的nonce
  const signed = await acc1.signTransaction(txn, true);

  // send the transaction, it will also use speicific shardID to send the transaction
  // 发送交易，同样会根据shardID来进行交易的发送
  const [sent, id] = await signed.sendTransaction();

   // print the id(transactionHash), and the class that return as well
  // 打印返回的Transaction Class，和transaction ID
  console.log({ sent, id });


  // you can use Transaction.confirm() to confirm the transaction is on the blockchain or not
  //使用confirm进行transactionReceipt的获取以确认
  await sent.confirm(id);

  // of course you can use blockchain.getTransactionReceipt to get the receipt
  // you have to specify the shardID here.
  // 同样可以通过blockchain类来获取transaction Receipt
  // 注意你需要指定shardID

  const receipt = await harmony.blockchain.getTransactionReceipt({
    txnHash: id,
    shardID: sent.txParams.shardID,
  });

  console.log({ receipt: receipt.result });
}

```
