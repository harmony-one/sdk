> **[@harmony-js/core](../README.md)**

[Blockchain](blockchain.md) /

# Class: Blockchain

## Hierarchy

* **Blockchain**

## Index

### Constructors

* [constructor](blockchain.md#constructor)

### Properties

* [messenger](blockchain.md#messenger)

### Methods

* [call](blockchain.md#call)
* [createObservedTransaction](blockchain.md#createobservedtransaction)
* [estimateGas](blockchain.md#estimategas)
* [gasPrice](blockchain.md#gasprice)
* [getBalance](blockchain.md#getbalance)
* [getBlockByHash](blockchain.md#getblockbyhash)
* [getBlockByNumber](blockchain.md#getblockbynumber)
* [getBlockNumber](blockchain.md#getblocknumber)
* [getBlockTransactionCountByHash](blockchain.md#getblocktransactioncountbyhash)
* [getBlockTransactionCountByNumber](blockchain.md#getblocktransactioncountbynumber)
* [getCode](blockchain.md#getcode)
* [getProtocalVersion](blockchain.md#getprotocalversion)
* [getRpcResult](blockchain.md#getrpcresult)
* [getStorageAt](blockchain.md#getstorageat)
* [getTransactionByBlockHashAndIndex](blockchain.md#gettransactionbyblockhashandindex)
* [getTransactionByBlockNumberAndIndex](blockchain.md#gettransactionbyblocknumberandindex)
* [getTransactionByHash](blockchain.md#gettransactionbyhash)
* [getTransactionCount](blockchain.md#gettransactioncount)
* [getTransactionReceipt](blockchain.md#gettransactionreceipt)
* [logs](blockchain.md#logs)
* [net_peerCount](blockchain.md#net_peercount)
* [net_version](blockchain.md#net_version)
* [newBlockHeaders](blockchain.md#newblockheaders)
* [newPendingTransactions](blockchain.md#newpendingtransactions)
* [sendRawTransaction](blockchain.md#sendrawtransaction)
* [sendTransaction](blockchain.md#sendtransaction)
* [setMessenger](blockchain.md#setmessenger)
* [syncing](blockchain.md#syncing)

## Constructors

###  constructor

\+ **new Blockchain**(`messenger`: `Messenger`): *[Blockchain](blockchain.md)*

*Defined in [blockchain.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`messenger` | `Messenger` |

**Returns:** *[Blockchain](blockchain.md)*

## Properties

###  messenger

• **messenger**: *`Messenger`*

*Defined in [blockchain.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L24)*

## Methods

###  call

▸ **call**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:347](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L347)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`blockNumber` | string |  DefaultBlockParams.latest |
`payload` | any | - |

**Returns:** *`Promise<any>`*

___

###  createObservedTransaction

▸ **createObservedTransaction**(`transaction`: `Transaction`): *`Emitter`*

*Defined in [blockchain.ts:310](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L310)*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | `Transaction` |

**Returns:** *`Emitter`*

___

###  estimateGas

▸ **estimateGas**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:329](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L329)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`data` | string |
`to` | string |

**Returns:** *`Promise<any>`*

___

###  gasPrice

▸ **gasPrice**(): *`Promise<any>`*

*Defined in [blockchain.ts:338](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L338)*

**Returns:** *`Promise<any>`*

___

###  getBalance

▸ **getBalance**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:47](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L47)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`address` | string | - |
`blockNumber` | string |  DefaultBlockParams.latest |

**Returns:** *`Promise<any>`*

___

###  getBlockByHash

▸ **getBlockByHash**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:77](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L77)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`blockHash` | string | - |
`returnObject` | boolean | true |

**Returns:** *`Promise<any>`*

___

###  getBlockByNumber

▸ **getBlockByNumber**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:99](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L99)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`blockNumber` | string |  DefaultBlockParams.latest |
`returnObject` | boolean | true |

**Returns:** *`Promise<any>`*

___

###  getBlockNumber

▸ **getBlockNumber**(): *`Promise<any>`*

*Defined in [blockchain.ts:62](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L62)*

**Returns:** *`Promise<any>`*

___

###  getBlockTransactionCountByHash

▸ **getBlockTransactionCountByHash**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:117](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L117)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`blockHash` | string |

**Returns:** *`Promise<any>`*

___

###  getBlockTransactionCountByNumber

▸ **getBlockTransactionCountByNumber**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:129](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L129)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`blockNumber` | string |

**Returns:** *`Promise<any>`*

___

###  getCode

▸ **getCode**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:212](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L212)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`address` | string | - |
`blockNumber` | string |  DefaultBlockParams.latest |

**Returns:** *`Promise<any>`*

___

###  getProtocalVersion

▸ **getProtocalVersion**(): *`Promise<any>`*

*Defined in [blockchain.ts:238](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L238)*

**Returns:** *`Promise<any>`*

___

###  getRpcResult

▸ **getRpcResult**(`result`: any): *any*

*Defined in [blockchain.ts:32](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`result` | any |

**Returns:** *any*

___

###  getStorageAt

▸ **getStorageAt**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:252](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L252)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`address` | string | - |
`blockNumber` | string |  DefaultBlockParams.latest |
`position` | string | - |

**Returns:** *`Promise<any>`*

___

###  getTransactionByBlockHashAndIndex

▸ **getTransactionByBlockHashAndIndex**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:145](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L145)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`blockHash` | string |
`index` | string |

**Returns:** *`Promise<any>`*

___

###  getTransactionByBlockNumberAndIndex

▸ **getTransactionByBlockNumberAndIndex**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:164](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L164)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`blockNumber` | string |  DefaultBlockParams.latest |
`index` | string | - |

**Returns:** *`Promise<any>`*

___

###  getTransactionByHash

▸ **getTransactionByHash**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:182](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L182)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`txnHash` | string |

**Returns:** *`Promise<any>`*

___

###  getTransactionCount

▸ **getTransactionCount**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:273](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L273)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`address` | string | - |
`blockNumber` | string |  DefaultBlockParams.latest |

**Returns:** *`Promise<any>`*

___

###  getTransactionReceipt

▸ **getTransactionReceipt**(`__namedParameters`: object): *`Promise<any>`*

*Defined in [blockchain.ts:197](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L197)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`txnHash` | string |

**Returns:** *`Promise<any>`*

___

###  logs

▸ **logs**(`options`: any): *`LogSub`*

*Defined in [blockchain.ts:386](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L386)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *`LogSub`*

___

###  net_peerCount

▸ **net_peerCount**(): *`Promise<any>`*

*Defined in [blockchain.ts:227](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L227)*

**Returns:** *`Promise<any>`*

___

###  net_version

▸ **net_version**(): *`Promise<any>`*

*Defined in [blockchain.ts:232](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L232)*

**Returns:** *`Promise<any>`*

___

###  newBlockHeaders

▸ **newBlockHeaders**(): *`NewHeaders`*

*Defined in [blockchain.ts:370](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L370)*

**Returns:** *`NewHeaders`*

___

###  newPendingTransactions

▸ **newPendingTransactions**(): *`NewPendingTransactions`*

*Defined in [blockchain.ts:362](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L362)*

**Returns:** *`NewPendingTransactions`*

___

###  sendRawTransaction

▸ **sendRawTransaction**(`transaction`: `Transaction`): *`Promise<undefined | string>`*

*Defined in [blockchain.ts:300](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L300)*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | `Transaction` |

**Returns:** *`Promise<undefined | string>`*

___

###  sendTransaction

▸ **sendTransaction**(`transaction`: `Transaction`): *`Promise<any>`*

*Defined in [blockchain.ts:288](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L288)*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | `Transaction` |

**Returns:** *`Promise<any>`*

___

###  setMessenger

▸ **setMessenger**(`messenger`: `Messenger`): *void*

*Defined in [blockchain.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`messenger` | `Messenger` |

**Returns:** *void*

___

###  syncing

▸ **syncing**(): *`Syncing`*

*Defined in [blockchain.ts:378](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-core/src/blockchain.ts#L378)*

**Returns:** *`Syncing`*