> **[@harmony-js/transaction](../README.md)**

[TransactionFactory](transactionfactory.md) /

# Class: TransactionFactory

## Hierarchy

* **TransactionFactory**

## Index

### Constructors

* [constructor](transactionfactory.md#constructor)

### Properties

* [messenger](transactionfactory.md#messenger)

### Methods

* [clone](transactionfactory.md#clone)
* [newTx](transactionfactory.md#newtx)
* [recover](transactionfactory.md#recover)
* [setMessenger](transactionfactory.md#setmessenger)
* [getContractAddress](transactionfactory.md#static-getcontractaddress)

## Constructors

###  constructor

\+ **new TransactionFactory**(`messenger`: `Messenger`): *[TransactionFactory](transactionfactory.md)*

*Defined in [factory.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/factory.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`messenger` | `Messenger` |

**Returns:** *[TransactionFactory](transactionfactory.md)*

## Properties

###  messenger

• **messenger**: *`Messenger`*

*Defined in [factory.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/factory.ts#L13)*

## Methods

###  clone

▸ **clone**(`transaction`: [Transaction](transaction.md)): *[Transaction](transaction.md)*

*Defined in [factory.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/factory.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | [Transaction](transaction.md) |

**Returns:** *[Transaction](transaction.md)*

___

###  newTx

▸ **newTx**(`txParams?`: [TxParams](../interfaces/txparams.md) | any): *[Transaction](transaction.md)*

*Defined in [factory.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/factory.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`txParams?` | [TxParams](../interfaces/txparams.md) \| any |

**Returns:** *[Transaction](transaction.md)*

___

###  recover

▸ **recover**(`txHash`: string): *[Transaction](transaction.md)*

*Defined in [factory.ts:33](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/factory.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`txHash` | string |

**Returns:** *[Transaction](transaction.md)*

___

###  setMessenger

▸ **setMessenger**(`messenger`: `Messenger`): *void*

*Defined in [factory.ts:17](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/factory.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`messenger` | `Messenger` |

**Returns:** *void*

___

### `Static` getContractAddress

▸ **getContractAddress**(`tx`: [Transaction](transaction.md)): *string*

*Defined in [factory.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-transaction/src/factory.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`tx` | [Transaction](transaction.md) |

**Returns:** *string*