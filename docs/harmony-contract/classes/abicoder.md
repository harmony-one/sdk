> **[@harmony-js/contract](../README.md)**

[AbiCoder](abicoder.md) /

# Class: AbiCoder

## Hierarchy

* **AbiCoder**

## Callable

▸ **AbiCoder**(): *[AbiCoderClass](abicoderclass.md)*

*Defined in [abi/index.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/index.ts#L4)*

**Returns:** *[AbiCoderClass](abicoderclass.md)*

## Index

### Constructors

* [constructor](abicoder.md#constructor)

### Properties

* [coerceFunc](abicoder.md#coercefunc)

### Methods

* [decode](abicoder.md#decode)
* [encode](abicoder.md#encode)

## Constructors

###  constructor

\+ **new AbiCoder**(`coerceFunc?`: [CoerceFunc](../README.md#coercefunc)): *[AbiCoder](abicoder.md)*

*Defined in [abi/abiCoder.ts:1506](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L1506)*

**Parameters:**

Name | Type |
------ | ------ |
`coerceFunc?` | [CoerceFunc](../README.md#coercefunc) |

**Returns:** *[AbiCoder](abicoder.md)*

## Properties

###  coerceFunc

• **coerceFunc**: *[CoerceFunc](../README.md#coercefunc)*

*Defined in [abi/abiCoder.ts:1506](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L1506)*

## Methods

###  decode

▸ **decode**(`types`: `Array<string | ParamType>`, `data`: `Arrayish`): *any*

*Defined in [abi/abiCoder.ts:1546](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L1546)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | `Array<string \| ParamType>` |
`data` | `Arrayish` |

**Returns:** *any*

___

###  encode

▸ **encode**(`types`: `Array<string | ParamType>`, `values`: any[]): *string*

*Defined in [abi/abiCoder.ts:1516](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L1516)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | `Array<string \| ParamType>` |
`values` | any[] |

**Returns:** *string*