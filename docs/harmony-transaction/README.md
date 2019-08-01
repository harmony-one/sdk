> **[@harmony-js/transaction](README.md)**

## Index

### Enumerations

* [TransactionEvents](enums/transactionevents.md)
* [TxStatus](enums/txstatus.md)

### Classes

* [Transaction](classes/transaction.md)
* [TransactionFactory](classes/transactionfactory.md)

### Interfaces

* [TransasctionReceipt](interfaces/transasctionreceipt.md)
* [TxParams](interfaces/txparams.md)

### Variables

* [defaultMessenger](README.md#const-defaultmessenger)
* [transactionFields](README.md#const-transactionfields)
* [transactionFieldsETH](README.md#const-transactionfieldseth)

### Functions

* [RLPSign](README.md#const-rlpsign)
* [handleAddress](README.md#const-handleaddress)
* [handleNumber](README.md#const-handlenumber)
* [recover](README.md#const-recover)
* [recoverETH](README.md#const-recovereth)
* [sleep](README.md#const-sleep)

## Variables

### `Const` defaultMessenger

• **defaultMessenger**: *`Messenger`* =  new Messenger(
  new HttpProvider('http://localhost:8545'),
  ChainType.Harmony,
)

*Defined in [utils.ts:259](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L259)*

___

### `Const` transactionFields

• **transactionFields**: *object | object | object[]* =  [
  { name: 'nonce', length: 32, fix: false },
  { name: 'gasPrice', length: 32, fix: false, transform: 'hex' },
  { name: 'gasLimit', length: 32, fix: false, transform: 'hex' },
  { name: 'shardID', length: 16, fix: false },
  // recover it after main repo fix
  { name: 'toShardID', length: 16, fix: false },
  { name: 'to', length: 20, fix: true },
  { name: 'value', length: 32, fix: false, transform: 'hex' },
  { name: 'data', fix: false },
]

*Defined in [utils.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L24)*

___

### `Const` transactionFieldsETH

• **transactionFieldsETH**: *object | object | object[]* =  [
  { name: 'nonce', length: 32, fix: false },
  { name: 'gasPrice', length: 32, fix: false, transform: 'hex' },
  { name: 'gasLimit', length: 32, fix: false, transform: 'hex' },
  { name: 'to', length: 20, fix: true },
  { name: 'value', length: 32, fix: false, transform: 'hex' },
  { name: 'data', fix: false },
]

*Defined in [utils.ts:36](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L36)*

## Functions

### `Const` RLPSign

▸ **RLPSign**(`transaction`: [Transaction](classes/transaction.md), `prv`: string): *[`Signature`, string]*

*Defined in [utils.ts:264](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L264)*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | [Transaction](classes/transaction.md) |
`prv` | string |

**Returns:** *[`Signature`, string]*

___

### `Const` handleAddress

▸ **handleAddress**(`value`: string): *string*

*Defined in [utils.ts:55](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *string*

___

### `Const` handleNumber

▸ **handleNumber**(`value`: string): *string*

*Defined in [utils.ts:45](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *string*

___

### `Const` recover

▸ **recover**(`rawTransaction`: string): *[TxParams](interfaces/txparams.md)*

*Defined in [utils.ts:65](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`rawTransaction` | string |

**Returns:** *[TxParams](interfaces/txparams.md)*

___

### `Const` recoverETH

▸ **recoverETH**(`rawTransaction`: string): *[TxParams](interfaces/txparams.md)*

*Defined in [utils.ts:156](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`rawTransaction` | string |

**Returns:** *[TxParams](interfaces/txparams.md)*

___

### `Const` sleep

▸ **sleep**(`ms`: number): *`Promise<unknown>`*

*Defined in [utils.ts:247](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/utils.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |

**Returns:** *`Promise<unknown>`*