/**
 # @harmony-js/core

This package provides a collection of apis to interact with Harmony blockchain.

## Installation

```
npm install @harmony-js/core
```

## Usage

Create a Harmony instance connecting to testnet

```javascript
* const { Harmony } = require('@harmony-js/core');
* const {
*   ChainID,
*   ChainType,
*   hexToNumber,
*   numberToHex,
*   fromWei,
*   Units,
*   Unit,
* } = require('@harmony-js/utils');

* const hmy = new Harmony(
*     'https://api.s0.b.hmny.io/',
*     {
*         chainType: ChainType.Harmony,
*         chainId: ChainID.HmyTestnet,
*     },
* );
```

Getting balance of account `one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7`
```javascript
* hmy.blockchain
*   .getBalance({ address: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7' })
*   .then((response) => {
*     console.log('balance in ONEs: ' + fromWei(hexToNumber(response.result), Units.one));
*   });
```

Getting the latest block number
```javascript
* hmy.blockchain.getBlockNumber().then((response) => {
*   console.log('current block number: ' + hexToNumber(response.result));
* });
```

Getting the block using block hash
```javascript
* hmy.blockchain
*   .getBlockByHash({
*     blockHash: '0x08c46ae7249362a7d1f602d44c5a81f33ebdab6a7dcb6068f99610b57911aafd',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the block using block number
```javascript
* hmy.blockchain
*   .getBlockByNumber({
*     blockNumber: numberToHex(422635),
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the transaction using hash
```javascript
* hmy.blockchain
*   .getTransactionByHash({
*     txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the transaction receipt
```javascript
* hmy.blockchain
*   .getTransactionReceipt({
*     txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the cross-shard transaction receipt
```javascript
* hmy.blockchain
*   .getCxReceiptByHash({
*     txnHash: '0xcd36a90ff5d5373285c2896ba7bbcd3f5324263c0cb8ecfb7cad2f5fc2fbdbda',
*     shardID: 1,
*   })
*   .then((value) => {
*     console.log(value.result);
*   });
```

Getting the deployed smart contract code
```javascript
* hmy.blockchain
*   .getCode({
*     address: '0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
*     blockNumber: 'latest',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the transaction count of an account
```javascript
* hmy.blockchain
*   .getTransactionCount({
*     address: 'one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy',
*   })
*   .then((response) => {
*     console.log(hexToNumber(response.result));
*   });
```

Getting the shard structure and details
```javascript
* hmy.blockchain.getShardingStructure().then((response) => {
*   console.log(response.result);
* });
```

Transferring funds using `sendTransaction`
```javascript
// key corresponds to one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7, only has testnet balance
* hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

* async function transfer() {
*   const txn = hmy.transactions.newTx({
*     to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
*     value: new Unit(1).asOne().toWei(),
*     // gas limit, you can use string
*     gasLimit: '21000',
*     // send token from shardID
*     shardID: 0,
*     // send token to toShardID
*     toShardID: 0,
*     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
*     gasPrice: new hmy.utils.Unit('1').asGwei().toWei(),
*   });

*   // sign the transaction use wallet;
*   const signedTxn = await hmy.wallet.signTransaction(txn);
*   const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
*   console.log(txnHash.result);
* }

* transfer();
```
 *
 * @packageDocumentation
 * @module harmony-core
 */

import {
  RPCMethod,
  Messenger,
  ResponseMiddleware,
  WSProvider,
  NewPendingTransactions,
  NewHeaders,
  LogSub,
  Syncing,
} from '@harmony-js/network';

import {
  assertObject,
  AssertType,
  // HarmonyCore,
  DefaultBlockParams,
} from '@harmony-js/utils';

import { getAddress } from '@harmony-js/crypto';

import { Transaction } from '@harmony-js/transaction';
import { StakingTransaction } from '@harmony-js/staking';

class Blockchain {
  /**
   * @hidden
   */
  messenger: Messenger;

  /**
   * @hidden
   */
  constructor(messenger: Messenger) {
    this.messenger = messenger;
  }

  /**
   * @hidden
   */
  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  /**
   *
   * @hidden
   */
  getRpcResult(result: any) {
    if (result instanceof ResponseMiddleware) {
      return result.getRaw;
    } else {
      return result;
    }
  }

  /**
   * Get the balance of an address at a given block.
   *
   * @param address the address to get the balance of.
   * @param blockNumber (option) If you pass this parameter it will not use the default block set with `DefaultBlockParams.latest`
   * @param shardID (option) If you pass this parameter it will not use the default block set with `this.messenger.currentShard`
   *
   * @returns The current balance for the given address in wei.
   *
   * @hint
   * ```
   * the third param `shardID` is binding with the endpoint
   * shard 0: localhost:9500
   * shard 1: localhost:9501
   * ```
   *
   * @example
   * ```javascript
   * hmy.blockchain.getBalance({
   *   address: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
   *   blockNumber: 'latest'
   * }).then(value => {
   *   console.log(value.result);
   * });
   * ```
   */
  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBalance({
    address,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBalance,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the current block number.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @return `Promise` - The number of the most recent block.
   *
   * @hint
   * ```
   * the third param `shardID` is binding with the endpoint
   * shard 0: localhost:9500
   * shard 1: localhost:9501
   * ```
   *
   * @example
   * ```javascript
   * hmy.blockchain.getBlockNumber().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async getBlockNumber(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(
      RPCMethod.BlockNumber,
      [],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a block matching the block Hash.
   *
   * @param blockHash the block hash
   * @param returnObject By default it is `true`, Features in development, IGNORE it!
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - The block object
   *
   * @example
   * ```javascript
   * hmy.blockchain.getBlockByHash({
   *   blockHash: '0x9cd821b576efdff61280e8857ef218fb2cff8db0cf0fb27dfceef7237042b79e',
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    returnObject: ['isBoolean', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockByHash({
    blockHash,
    returnObject = true,
    shardID = this.messenger.currentShard,
  }: {
    blockHash: string;
    returnObject?: boolean;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockByHash,
      [blockHash, returnObject],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a block matching the block Number.
   *
   * @param blockNumber the block number
   * @param returnObject By default it is `true`, Features in development, IGNORE it!
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - The block object
   *
   * @example
   * ```javascript
   * hmy.blockchain.getBlockByNumber({
   *   blockNumber: '0x89',
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.optional],
    returnObject: ['isBoolean', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockByNumber({
    blockNumber = DefaultBlockParams.latest,
    returnObject = true,
    shardID = this.messenger.currentShard,
  }: {
    blockNumber?: string;
    returnObject?: boolean;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockByNumber,
      [blockNumber, returnObject],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the number of transaction in a given block.
   *
   * @param blockHash the block number Hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  The number of transactions in the given block.
   *
   * @example
   * ```javascript
   * hmy.blockchain.getBlockTransactionCountByHash({
   *   blockHash: '0x4142514a238157e7fe57b9d54abedb33943507fa15b3799954c273a12705ced1'
   * }).then((value) => {
   *   console.log(value):
   * });
   * ```
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockTransactionCountByHash({
    blockHash,
    shardID = this.messenger.currentShard,
  }: {
    blockHash: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByHash,
      [blockHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the number of transaction in a given block.
   *
   * @param blockNumber the block number Hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  The number of transactions in the given block.
   *
   * @example
   * ```javascript
   * hmy.blockchain.getBlockTransactionCountByNumber({
   *   blockNumber: '0x2403C'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getBlockTransactionCountByNumber({
    blockNumber,
    shardID = this.messenger.currentShard,
  }: {
    blockNumber: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetBlockTransactionCountByNumber,
      [blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a transaction based on a block hash and the transactions index position.
   *
   * @param blockHash the block number Hash
   * @param index The transactions index position. **Hex Number**
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction object
   *
   * @example
   * ```javascript
   * hmy.blockchain.getTransactionByBlockHashAndIndex({
   *   blockHash: '0x4142514a238157e7fe57b9d54abedb33943507fa15b3799954c273a12705ced1',
   *   index: '0x0'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockHash: ['isHash', AssertType.required],
    index: ['isHex', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionByBlockHashAndIndex({
    blockHash,
    index,
    shardID = this.messenger.currentShard,
  }: {
    blockHash: string;
    index: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByBlockHashAndIndex,
      [blockHash, index],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a transaction based on a block number and the transactions index position.
   *
   * @param blockNumber the block number
   * @param index The transactions index position. **Hex Number**
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction object
   *
   * @example
   * ```javascript
   * hmy.blockchain.getTransactionByBlockNumberAndIndex({
   *   blockNumber: '0x2403C',
   *   index: '0x0'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    blockNumber: ['isBlockNumber', AssertType.optional],
    index: ['isHex', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionByBlockNumberAndIndex({
    blockNumber = DefaultBlockParams.latest,
    index,
    shardID = this.messenger.currentShard,
  }: {
    blockNumber?: string;
    index: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByBlockNumberAndIndex,
      [blockNumber, index],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns a transaction matching the given transaction hash.
   *
   * @param txnHash The transaction hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction object
   *
   * @example
   * ```javascript
   * hmy.blockchain.getTransactionByHash({
   *   txnHash: '0x146a0cf7e8da45b44194207c4e7785564527059483b765f9a04424554443b224'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    txnHash: ['isHash', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionByHash({
    txnHash,
    shardID = this.messenger.currentShard,
  }: {
    txnHash: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionByHash,
      [txnHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the receipt of a transaction by transaction hash.
   *
   * @param txnHash The transaction hash
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` -  A transaction receipt object, or `null` when no receipt was found
   *
   * @example
   * ```javascript
   * hmy.blockchain.getTransactionReceipt({
   *   txnHash: '0x146a0cf7e8da45b44194207c4e7785564527059483b765f9a04424554443b224'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    txnHash: ['isString', AssertType.required],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionReceipt({
    txnHash,
    shardID = this.messenger.currentShard,
  }: {
    txnHash: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionReceipt,
      [txnHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get transaction recepit from cross shard transaction
   *
   * @param txnHash The transaction hash
   * @param shardID the shard id of receiver's address
   * @returns `Promise` -  A transaction receipt object, or `null` when no receipt was found
   *
   * @example
   * ```javascript
   * // This transaction sends from shard 0 to shard 1
   * hmy.blockchain.getCxReceiptByHash({
   *   txnHash: '0x7fae9252fbda68d718e610bc10cf2b5c6a9cafb42d4a6b9d6e392c77d587b9ea',
   *   shardID: 1,
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    txnHash: ['isString', AssertType.required],
    shardID: ['isNumber', AssertType.required],
  })
  async getCxReceiptByHash({ txnHash, shardID }: { txnHash: string; shardID: number }) {
    const result = await this.messenger.send(
      RPCMethod.GetCXReceiptByHash,
      [txnHash],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get the code at a specific address.
   *
   * @param address The address to get the code from (eg:smart contract)
   * @param blockNumber (OPTIONAL) If you pass this parameter it will not use the default block
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @return `Promise` - The data at given `address`
   *
   * @example
   * ```javascript
   * hmy.blockchain.getCode({
   *   address: '0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
   *   blockNumber: 'latest'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getCode({
    address,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetCode,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get the number of peers connected to.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - number of peer count
   *
   * @example
   * ```javascript
   * hmy.blockchain.net_peerCount().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async net_peerCount(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(RPCMethod.PeerCount, [], 'net', shardID);

    return this.getRpcResult(result);
  }

  /**
   * Get the version of net.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - the current version.
   *
   * @example
   * ```javascript
   * hmy.blockchain.net_version().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async net_version(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(RPCMethod.NetVersion, [], 'net', shardID);

    return this.getRpcResult(result);
  }

  /**
   * Get the protocal version.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @returns `Promise` - the current protocol version.
   *
   * @example
   * ```javascript
   * hmy.blockchain.getProtocolVersion().then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  async getProtocolVersion(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(
      RPCMethod.ProtocolVersion,
      [],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get the storage at a specific position of an address
   *
   * @param address The address to get the storage from
   * @param position The index position of the storage
   * @param blockNumber by default it's `latest`.
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   *
   * @example
   * ```javascript
   * hmy.blockchain.getStorageAt({
   *   address: 'one1d0kw95t6kkljmkk9vu0zv25jraut8ngv5vrs5g',
   *   position: '0x0'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    address: ['isValidAddress', AssertType.required],
    position: ['isHex', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getStorageAt({
    address,
    position,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    position: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetStorageAt,
      [getAddress(address).checksum, position, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get the numbers of transactions sent from this address.
   *
   * @param address The address to get the numbers of transactions from
   * @param blockNumber by default it's `latest`
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @return `Promise` - The number of transactions sent from the given address.
   *
   * @example
   * ```javascript
   * hmy.blockchain.getTransactionCount({
   *   address: "one1d0kw95t6kkljmkk9vu0zv25jraut8ngv5vrs5g"
   * }).then((value) => {
   *   console.log(value.result);
   * });
   * ```
   */
  @assertObject({
    address: ['isValidAddress', AssertType.required],
    blockNumber: ['isBlockNumber', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async getTransactionCount({
    address,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    address: string;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.GetTransactionCount,
      [getAddress(address).checksum, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Get the sharding structure of current network
   *
   * @return `Promise` - The sharding structure of current network.
   *
   * @example
   * ```javascript
   * hmy.blockchain.getShardingStructure().then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  async getShardingStructure() {
    const result = await this.messenger.send(
      RPCMethod.GetShardingStructure,
      [],
      this.messenger.chainPrefix,
    );
    return this.getRpcResult(result);
  }

  /**
   * Sends a signed transaction to the network.
   *
   * @param transaction `Object` - The transaction object to send:
   * @return The **callbalck** will return the 32 bytes transaction hash
   *
   * @example
   * ```javascript
   * // add privateKey to wallet
   * const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
   * hmy.wallet.addByPrivateKey(privateKey);
   *
   * async function transfer() {
   *   const txn = hmy.transactions.newTx({
   *     //  token send to
   *     to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
   *     // amount to send
   *     value: '10000',
   *     // gas limit, you can use string
   *     gasLimit: '210000',
   *     // send token from shardID
   *     shardID: 0,
   *     // send token to toShardID
   *     toShardID: 0,
   *     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
   *     gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
   *   });
   *
   *   // sign the transaction use wallet;
   *   const signedTxn = await hmy.wallet.signTransaction(txn);
   *   const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
   *   console.log(txnHash.result);
   * }
   *
   * transfer();
   * ```
   */
  async sendTransaction(transaction: Transaction) {
    if (!transaction.isSigned() || !transaction) {
      throw new Error('transaction is not signed or not exist');
    }
    const result = await this.messenger.send(
      RPCMethod.SendRawTransaction,
      [transaction.getRawTransaction()],
      this.messenger.chainPrefix,
      typeof transaction.txParams.shardID === 'string'
        ? Number.parseInt(transaction.txParams.shardID, 10)
        : transaction.txParams.shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Sends a raw transaction to the network.
   *
   * @param transaction `Object` - The transaction object to send:
   * @return The **callbalck** will return the 32 bytes transaction hash
   *
   * @example
   * ```javascript
   * // add privateKey to wallet
   * const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
   * hmy.wallet.addByPrivateKey(privateKey);
   *
   * async function transfer() {
   *   const txn = hmy.transactions.newTx({
   *     //  token send to
   *     to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
   *     // amount to send
   *     value: '10000',
   *     // gas limit, you can use string
   *     gasLimit: '210000',
   *     // send token from shardID
   *     shardID: 0,
   *     // send token to toShardID
   *     toShardID: 0,
   *     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
   *     gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
   *   });
   *
   *   // sign the transaction use wallet;
   *   const signedTxn = await hmy.wallet.signTransaction(txn);
   *   recovered = signedTxn.recover(signedTxn.rawTransaction);
   *
   *   const txnHash = await hmy.blockchain.sendRawTransaction(recovered);
   *   console.log(txnHash);
   * }
   *
   * transfer();
   * ```
   */
  async sendRawTransaction(transaction: Transaction) {
    if (!transaction.isSigned() || !transaction) {
      throw new Error('transaction is not signed or not exist');
    }
    const [txn, result] = await transaction.sendTransaction();
    if (txn.isPending()) {
      return result;
    }
  }

  /**
   * send a transaction and check whether it exists
   *
   * @param transaction `Object` - The transaction object to send:
   * @return The **callbalck** will return the 32 bytes transaction hash
   *
   * @example
   * ```javascript
   * // add privateKey to wallet
   * const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
   * hmy.wallet.addByPrivateKey(privateKey);
   *
   * async function transfer() {
   *   const txn = hmy.transactions.newTx({
   *     //  token send to
   *     to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
   *     // amount to send
   *     value: '10000',
   *     // gas limit, you can use string
   *     gasLimit: '210000',
   *     // send token from shardID
   *     shardID: 0,
   *     // send token to toShardID
   *     toShardID: 0,
   *     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
   *     gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
   *   });
   *
   *   // sign the transaction use wallet;
   *   const signedTxn = await hmy.wallet.signTransaction(txn);
   *   const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn);
   *   console.log(txnHash);
   * }
   *
   * transfer();
   * ```
   */
  createObservedTransaction(transaction: Transaction) {
    try {
      transaction.sendTransaction().then((response: any) => {
        const [txReturned, TranID] = response;

        txReturned.confirm(TranID).then((txConfirmed: Transaction) => {
          transaction.emitter.resolve(txConfirmed);
        });
      });
      return transaction.emitter;
    } catch (err) {
      throw err;
    }
  }

  /**
   * send raw staking transaction
   *
   * @param staking
   * @ignore
   *
   * @warning
   * ```
   * At present, this function is not implement yet, will Coming soon!!!
   * ```
   */
  async sendRawStakingTransaction(staking: StakingTransaction) {
    if (!staking.isSigned() || !staking) {
      throw new Error('staking transaction is not signed or not exist');
    }
    const [txn, result] = await staking.sendTransaction();
    if (txn.isPending()) {
      return result;
    }
  }

  /**
   * send raw staking transaction and check whether it exists
   *
   * @param staking
   * @ignore
   *
   * @warning
   * ```
   * At present, this function is not implement yet, will Coming soon!!!
   * ```
   */
  createObservedStakingTransaction(staking: StakingTransaction) {
    try {
      staking.sendTransaction().then((response: any) => {
        const [txReturned, TranID] = response;

        txReturned.confirm(TranID).then((txConfirmed: StakingTransaction) => {
          staking.emitter.resolve(txConfirmed);
        });
      });
      return staking.emitter;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Executes a message call or transaction and returns the amount of the gas used.
   *
   * @param to the address will send to
   * @param data the data will send to that address
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @return `promise` -  the used gas for the simulated call/transaction.
   *
   * @warning
   * ```
   * At present, this function hmy_estimateGas is not implement yet, will Coming soon!!!
   * ```
   *
   * @example
   * ```javascript
   * hmy.blockchain.estimateGas({
   *   to: 'one1d0kw95t6kkljmkk9vu0zv25jraut8ngv5vrs5g',
   *   data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  @assertObject({
    to: ['isValidAddress', AssertType.optional],
    data: ['isHex', AssertType.optional],
    shardID: ['isNumber', AssertType.optional],
  })
  async estimateGas({
    to,
    data,
    shardID = this.messenger.currentShard,
  }: {
    to: string;
    data: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.EstimateGas,
      [{ to: getAddress(to).checksum, data }],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Returns the current gas price oracle. The gas price is determined by the last few blocks median gas price.
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   * @return `promise` - Number string of the current gas price in wei.
   *
   * @example
   * ```javascript
   * hmy.blockchain.gasPrice().then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  async gasPrice(shardID: number = this.messenger.currentShard) {
    const result = await this.messenger.send(
      RPCMethod.GasPrice,
      [],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Executes a message call transaction,
   * which is directly executed in the VM of the node, but never mined into the blockchain.
   *
   * @param payload some data you want put into these fucntions
   * @param blockNumber by default it's `latest`
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   *
   * @example
   * ```javascript
   * hmy.blockchain.call({
   *   to: "0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19",
   * }).then((value) => {
   *   console.log(value);
   * });
   * ```
   */
  async call({
    payload,
    blockNumber = DefaultBlockParams.latest,
    shardID = this.messenger.currentShard,
  }: {
    payload: any;
    blockNumber?: string;
    shardID?: number;
  }) {
    const result = await this.messenger.send(
      RPCMethod.Call,
      [payload, blockNumber],
      this.messenger.chainPrefix,
      shardID,
    );
    return this.getRpcResult(result);
  }

  /**
   * Return new pending Transactions
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   *
   * @example
   * ```javascript
   * const hmy = new Harmony(
   *   // rpc url
   *   'ws://api.s0.b.hmny.io/',
   *   {
   *     // chainType set to Harmony
   *     chainType: ChainType.Harmony,
   *     // chainType set to HmyLocal
   *     chainId: ChainID.HmyLocal,
   *   },
   * );
   *
   * const tmp = hmy.blockchain.newPendingTransactions();
   * console.log(tmp)
   * ```
   */
  newPendingTransactions(shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new NewPendingTransactions(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  /**
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   *
   * @example
   * ```javascript
   * const hmy = new Harmony(
   *   // rpc url
   *   'ws://api.s0.b.hmny.io/',
   *   {
   *     // chainType set to Harmony
   *     chainType: ChainType.Harmony,
   *     // chainType set to HmyLocal
   *     chainId: ChainID.HmyLocal,
   *   },
   * );
   *
   * const tmp = hmy.blockchain.newBlockHeaders();
   * console.log(tmp)
   * ```
   */
  newBlockHeaders(shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new NewHeaders(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  /**
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   *
   * @example
   * ```javascript
   * const hmy = new Harmony(
   *   // rpc url
   *   'ws://api.s0.b.hmny.io/',
   *   {
   *     // chainType set to Harmony
   *     chainType: ChainType.Harmony,
   *     // chainType set to HmyLocal
   *     chainId: ChainID.HmyLocal,
   *   },
   * );
   *
   * const tmp = hmy.blockchain.syncing();
   * console.log(tmp)
   * ```
   */
  syncing(shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new Syncing(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }

  /**
   *
   * @param shardID `shardID` is binding with the endpoint, IGNORE it!
   *
   * @example
   * ```javascript
   * const hmy = new Harmony(
   *   // rpc url
   *   'ws://api.s0.b.hmny.io/',
   *   {
   *     // chainType set to Harmony
   *     chainType: ChainType.Harmony,
   *     // chainType set to HmyLocal
   *     chainId: ChainID.HmyLocal,
   *   },
   * );
   *
   * const tmp = hmy.blockchain.logs({
   *   from: '0x12'
   * });
   * console.log(tmp)
   * ```
   */
  logs(options: any, shardID: number = this.messenger.currentShard) {
    if (this.messenger.provider instanceof WSProvider) {
      return new LogSub(options, this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }
}

export { Blockchain };
