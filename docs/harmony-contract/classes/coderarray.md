> **[@harmony-js/contract](../README.md)**

[CoderArray](coderarray.md) /

# Class: CoderArray

## Hierarchy

* [Coder](coder.md)

  * **CoderArray**

## Index

### Constructors

* [constructor](coderarray.md#constructor)

### Properties

* [coder](coderarray.md#coder)
* [coerceFunc](coderarray.md#coercefunc)
* [dynamic](coderarray.md#dynamic)
* [length](coderarray.md#length)
* [localName](coderarray.md#optional-localname)
* [name](coderarray.md#name)
* [type](coderarray.md#type)

### Methods

* [decode](coderarray.md#decode)
* [encode](coderarray.md#encode)

## Constructors

###  constructor

\+ **new CoderArray**(`coerceFunc`: [CoerceFunc](../README.md#coercefunc), `coder`: [Coder](coder.md), `length`: number, `localName`: string): *[CoderArray](coderarray.md)*

*Overrides [Coder](coder.md).[constructor](coder.md#constructor)*

*Defined in [abi/abiCoder.ts:976](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L976)*

**Parameters:**

Name | Type |
------ | ------ |
`coerceFunc` | [CoerceFunc](../README.md#coercefunc) |
`coder` | [Coder](coder.md) |
`length` | number |
`localName` | string |

**Returns:** *[CoderArray](coderarray.md)*

## Properties

###  coder

• **coder**: *[Coder](coder.md)*

*Defined in [abi/abiCoder.ts:975](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L975)*

___

###  coerceFunc

• **coerceFunc**: *[CoerceFunc](../README.md#coercefunc)*

*Inherited from [Coder](coder.md).[coerceFunc](coder.md#coercefunc)*

*Defined in [abi/abiCoder.ts:486](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L486)*

___

###  dynamic

• **dynamic**: *boolean*

*Inherited from [Coder](coder.md).[dynamic](coder.md#dynamic)*

*Defined in [abi/abiCoder.ts:490](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L490)*

___

###  length

• **length**: *number*

*Defined in [abi/abiCoder.ts:976](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L976)*

___

### `Optional` localName

• **localName**? : *undefined | string*

*Inherited from [Coder](coder.md).[localName](coder.md#optional-localname)*

*Defined in [abi/abiCoder.ts:489](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L489)*

___

###  name

• **name**: *string*

*Inherited from [Coder](coder.md).[name](coder.md#name)*

*Defined in [abi/abiCoder.ts:487](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L487)*

___

###  type

• **type**: *string*

*Inherited from [Coder](coder.md).[type](coder.md#type)*

*Defined in [abi/abiCoder.ts:488](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L488)*

## Methods

###  decode

▸ **decode**(`data`: `Uint8Array`, `offset`: number): *[DecodedResult](../interfaces/decodedresult.md)*

*Overrides [Coder](coder.md).[decode](coder.md#abstract-decode)*

*Defined in [abi/abiCoder.ts:1023](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L1023)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | `Uint8Array` |
`offset` | number |

**Returns:** *[DecodedResult](../interfaces/decodedresult.md)*

___

###  encode

▸ **encode**(`value`: any[]): *`Uint8Array`*

*Overrides [Coder](coder.md).[encode](coder.md#abstract-encode)*

*Defined in [abi/abiCoder.ts:991](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L991)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any[] |

**Returns:** *`Uint8Array`*