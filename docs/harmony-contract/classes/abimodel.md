> **[@harmony-js/contract](../README.md)**

[AbiModel](abimodel.md) /

# Class: AbiModel

## Hierarchy

* **AbiModel**

## Index

### Constructors

* [constructor](abimodel.md#constructor)

### Properties

* [abi](abimodel.md#abi)

### Methods

* [getEvent](abimodel.md#getevent)
* [getEventBySignature](abimodel.md#geteventbysignature)
* [getEvents](abimodel.md#getevents)
* [getMethod](abimodel.md#getmethod)
* [getMethods](abimodel.md#getmethods)
* [hasEvent](abimodel.md#hasevent)
* [hasMethod](abimodel.md#hasmethod)

## Constructors

###  constructor

\+ **new AbiModel**(`mappedAbi`: any): *[AbiModel](abimodel.md)*

*Defined in [models/AbiModel.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiModel.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`mappedAbi` | any |

**Returns:** *[AbiModel](abimodel.md)*

## Properties

###  abi

• **abi**: *any*

*Defined in [models/AbiModel.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiModel.ts#L4)*

## Methods

###  getEvent

▸ **getEvent**(`name`: string): *[AbiItemModel](../interfaces/abiitemmodel.md) | false*

*Defined in [models/types.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[AbiItemModel](../interfaces/abiitemmodel.md) | false*

___

###  getEventBySignature

▸ **getEventBySignature**(`signature`: string): *[AbiItemModel](../interfaces/abiitemmodel.md) | undefined*

*Defined in [models/types.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`signature` | string |

**Returns:** *[AbiItemModel](../interfaces/abiitemmodel.md) | undefined*

___

###  getEvents

▸ **getEvents**(): *[AbiItemModel](../interfaces/abiitemmodel.md)[]*

*Defined in [models/types.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L8)*

**Returns:** *[AbiItemModel](../interfaces/abiitemmodel.md)[]*

___

###  getMethod

▸ **getMethod**(`name`: string): *[AbiItemModel](../interfaces/abiitemmodel.md) | false*

*Defined in [models/types.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[AbiItemModel](../interfaces/abiitemmodel.md) | false*

___

###  getMethods

▸ **getMethods**(): *[AbiItemModel](../interfaces/abiitemmodel.md)[]*

*Defined in [models/types.ts:5](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L5)*

**Returns:** *[AbiItemModel](../interfaces/abiitemmodel.md)[]*

___

###  hasEvent

▸ **hasEvent**(`name`: string): *boolean*

*Defined in [models/types.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

###  hasMethod

▸ **hasMethod**(`name`: string): *boolean*

*Defined in [models/types.ts:6](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*