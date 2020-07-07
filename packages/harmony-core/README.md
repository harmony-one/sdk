# @harmony-js/core

This package provides a collection of apis to interact with Harmony blockchain.

## Installation

```
npm install @harmony-js/core
```

## Usage

Create a Harmony instance connecting to testnet

```javascript
const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@harmony-js/utils');

const hmy = new Harmony(
    'https://api.s0.b.hmny.io/',
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyTestnet,
    },
);
```

Getting balance of account `one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7`
```javascript
hmy.blockchain
  .getBalance({ address: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7' })
  .then((response) => {
    console.log('balance in ONEs: ' + fromWei(hexToNumber(response.result), Units.one));
  });
```

Getting the latest block number
```javascript
hmy.blockchain.getBlockNumber().then((response) => {
  console.log('current block number: ' + hexToNumber(response.result));
});
```

Getting the block using block hash
```javascript
hmy.blockchain
  .getBlockByHash({
    blockHash: '0x08c46ae7249362a7d1f602d44c5a81f33ebdab6a7dcb6068f99610b57911aafd',
  })
  .then((response) => {
    console.log(response.result);
  });
```

Getting the block using block number
```javascript
hmy.blockchain
  .getBlockByNumber({
    blockNumber: numberToHex(422635),
  })
  .then((response) => {
    console.log(response.result);
  });
```

Getting the transaction using hash
```javascript
hmy.blockchain
  .getTransactionByHash({
    txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
  })
  .then((response) => {
    console.log(response.result);
  });
```

Getting the transaction receipt
```javascript
hmy.blockchain
  .getTransactionReceipt({
    txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
  })
  .then((response) => {
    console.log(response.result);
  });
```

Getting the cross-shard transaction receipt
```javascript
hmy.blockchain
  .getCxReceiptByHash({
    txnHash: '0xcd36a90ff5d5373285c2896ba7bbcd3f5324263c0cb8ecfb7cad2f5fc2fbdbda',
    shardID: 1,
  })
  .then((value) => {
    console.log(value.result);
  });
```

Getting the deployed smart contract code
```javascript
hmy.blockchain
  .getCode({
    address: '0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
    blockNumber: 'latest',
  })
  .then((response) => {
    console.log(response.result);
  });
```

Getting the transaction count of an account
```javascript
hmy.blockchain
  .getTransactionCount({
    address: 'one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy',
  })
  .then((response) => {
    console.log(hexToNumber(response.result));
  });
```

Getting the shard structure and details
```javascript
hmy.blockchain.getShardingStructure().then((response) => {
  console.log(response.result);
});
```

Transferring funds using `sendTransaction`
```javascript
// key corresponds to one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7, only has testnet balance
hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

async function transfer() {
  const txn = hmy.transactions.newTx({
    to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
    value: new Unit(1).asOne().toWei(),
    // gas limit, you can use string
    gasLimit: '21000',
    // send token from shardID
    shardID: 0,
    // send token to toShardID
    toShardID: 0,
    // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
    gasPrice: new hmy.utils.Unit('1').asGwei().toWei(),
  });

  // sign the transaction use wallet;
  const signedTxn = await hmy.wallet.signTransaction(txn);
  const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
  console.log(txnHash.result);
}

transfer();
```