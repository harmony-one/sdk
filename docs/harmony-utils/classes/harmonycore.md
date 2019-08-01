> **[@harmony-js/utils](../README.md)**

[HarmonyCore](harmonycore.md) /

# Class: HarmonyCore

## Hierarchy

* **HarmonyCore**

## Index

### Constructors

* [constructor](harmonycore.md#constructor)

### Properties

* [chainId](harmonycore.md#chainid)
* [chainType](harmonycore.md#chaintype)

### Accessors

* [chainPrefix](harmonycore.md#chainprefix)
* [getChainId](harmonycore.md#getchainid)

### Methods

* [setChainId](harmonycore.md#setchainid)
* [setChainType](harmonycore.md#setchaintype)

## Constructors

###  constructor

\+ **new HarmonyCore**(`chainType`: [ChainType](../enums/chaintype.md), `chainId`: [ChainID](../enums/chainid.md)): *[HarmonyCore](harmonycore.md)*

*Defined in [chain.ts:38](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`chainType` | [ChainType](../enums/chaintype.md) | - |
`chainId` | [ChainID](../enums/chainid.md) |  defaultConfig.Default.Chain_ID |

**Returns:** *[HarmonyCore](harmonycore.md)*

## Properties

###  chainId

• **chainId**: *[ChainID](../enums/chainid.md)*

*Defined in [chain.ts:38](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L38)*

___

###  chainType

• **chainType**: *[ChainType](../enums/chaintype.md)*

*Defined in [chain.ts:37](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L37)*

## Accessors

###  chainPrefix

• **get chainPrefix**(): *string*

*Defined in [chain.ts:46](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L46)*

**Returns:** *string*

___

###  getChainId

• **get getChainId**(): *[ChainID](../enums/chainid.md)*

*Defined in [chain.ts:59](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L59)*

**Returns:** *[ChainID](../enums/chainid.md)*

## Methods

###  setChainId

▸ **setChainId**(`chainId`: [ChainID](../enums/chainid.md)): *void*

*Defined in [chain.ts:62](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`chainId` | [ChainID](../enums/chainid.md) |

**Returns:** *void*

___

###  setChainType

▸ **setChainType**(`chainType`: [ChainType](../enums/chaintype.md)): *void*

*Defined in [chain.ts:65](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`chainType` | [ChainType](../enums/chaintype.md) |

**Returns:** *void*