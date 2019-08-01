> **[@harmony-js/contract](../README.md)**

[Contract](contract.md) /

# Class: Contract

## Hierarchy

* **Contract**

## Index

### Constructors

* [constructor](contract.md#constructor)

### Properties

* [abiCoder](contract.md#abicoder)
* [abiModel](contract.md#abimodel)
* [events](contract.md#events)
* [methods](contract.md#methods)
* [options](contract.md#options)
* [status](contract.md#status)
* [transaction](contract.md#optional-transaction)
* [wallet](contract.md#wallet)

### Accessors

* [address](contract.md#address)
* [data](contract.md#data)
* [jsonInterface](contract.md#jsoninterface)

### Methods

* [connect](contract.md#connect)
* [deploy](contract.md#deploy)
* [isCalled](contract.md#iscalled)
* [isDeployed](contract.md#isdeployed)
* [isInitialised](contract.md#isinitialised)
* [isRejected](contract.md#isrejected)
* [isSent](contract.md#issent)
* [isSigned](contract.md#issigned)
* [runEventFactory](contract.md#runeventfactory)
* [runMethodFactory](contract.md#runmethodfactory)
* [setStatus](contract.md#setstatus)

## Constructors

###  constructor

\+ **new Contract**(`abi`: any, `address`: string, `options`: [ContractOptions](../interfaces/contractoptions.md), `wallet`: `Wallet`, `status`: [ContractStatus](../enums/contractstatus.md)): *[Contract](contract.md)*

*Defined in [contract.ts:22](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L22)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`abi` | any |  [] |
`address` | string | "0x" |
`options` | [ContractOptions](../interfaces/contractoptions.md) |  {} |
`wallet` | `Wallet` | - |
`status` | [ContractStatus](../enums/contractstatus.md) |  ContractStatus.INITIALISED |

**Returns:** *[Contract](contract.md)*

## Properties

###  abiCoder

• **abiCoder**: *[AbiCoderClass](abicoderclass.md)*

*Defined in [contract.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L18)*

___

###  abiModel

• **abiModel**: *any | [AbiModel](abimodel.md)*

*Defined in [contract.ts:17](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L17)*

___

###  events

• **events**: *any*

*Defined in [contract.ts:16](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L16)*

___

###  methods

• **methods**: *any*

*Defined in [contract.ts:15](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L15)*

___

###  options

• **options**: *[ContractOptions](../interfaces/contractoptions.md) | any*

*Defined in [contract.ts:19](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L19)*

___

###  status

• **status**: *[ContractStatus](../enums/contractstatus.md)*

*Defined in [contract.ts:22](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L22)*

___

### `Optional` transaction

• **transaction**? : *`Transaction`*

*Defined in [contract.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L21)*

___

###  wallet

• **wallet**: *`Wallet`*

*Defined in [contract.ts:20](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L20)*

## Accessors

###  address

• **get address**(): *string*

*Defined in [contract.ts:76](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L76)*

**Returns:** *string*

• **set address**(`value`: string): *void*

*Defined in [contract.ts:80](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *void*

___

###  data

• **get data**(): *any*

*Defined in [contract.ts:84](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L84)*

**Returns:** *any*

• **set data**(`value`: any): *void*

*Defined in [contract.ts:88](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *void*

___

###  jsonInterface

• **get jsonInterface**(): *any[]*

*Defined in [contract.ts:66](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L66)*

**Returns:** *any[]*

• **set jsonInterface**(`value`: any[]): *void*

*Defined in [contract.ts:70](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any[] |

**Returns:** *void*

## Methods

###  connect

▸ **connect**(`wallet`: `Wallet`): *void*

*Defined in [contract.ts:103](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`wallet` | `Wallet` |

**Returns:** *void*

___

###  deploy

▸ **deploy**(`options`: any): *any*

*Defined in [contract.ts:93](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *any*

___

###  isCalled

▸ **isCalled**(): *boolean*

*Defined in [contract.ts:59](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L59)*

**Returns:** *boolean*

___

###  isDeployed

▸ **isDeployed**(): *boolean*

*Defined in [contract.ts:53](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L53)*

**Returns:** *boolean*

___

###  isInitialised

▸ **isInitialised**(): *boolean*

*Defined in [contract.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L44)*

**Returns:** *boolean*

___

###  isRejected

▸ **isRejected**(): *boolean*

*Defined in [contract.ts:56](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L56)*

**Returns:** *boolean*

___

###  isSent

▸ **isSent**(): *boolean*

*Defined in [contract.ts:50](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L50)*

**Returns:** *boolean*

___

###  isSigned

▸ **isSigned**(): *boolean*

*Defined in [contract.ts:47](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L47)*

**Returns:** *boolean*

___

###  runEventFactory

▸ **runEventFactory**(): *[Contract](contract.md)*

*Defined in [contract.ts:100](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L100)*

**Returns:** *[Contract](contract.md)*

___

###  runMethodFactory

▸ **runMethodFactory**(): *[Contract](contract.md)*

*Defined in [contract.ts:97](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L97)*

**Returns:** *[Contract](contract.md)*

___

###  setStatus

▸ **setStatus**(`status`: [ContractStatus](../enums/contractstatus.md)): *void*

*Defined in [contract.ts:62](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contract.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`status` | [ContractStatus](../enums/contractstatus.md) |

**Returns:** *void*