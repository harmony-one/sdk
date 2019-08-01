> **[@harmony-js/contract](../README.md)**

[CoderBoolean](coderboolean.md) /

# Class: CoderBoolean

## Hierarchy

* [Coder](coder.md)

  * **CoderBoolean**

## Index

### Constructors

* [constructor](coderboolean.md#constructor)

### Properties

* [coerceFunc](coderboolean.md#coercefunc)
* [dynamic](coderboolean.md#dynamic)
* [localName](coderboolean.md#optional-localname)
* [name](coderboolean.md#name)
* [type](coderboolean.md#type)

### Methods

* [decode](coderboolean.md#decode)
* [encode](coderboolean.md#encode)

## Constructors

###  constructor

\+ **new CoderBoolean**(`coerceFunc`: [CoerceFunc](../README.md#coercefunc), `localName`: string): *[CoderBoolean](coderboolean.md)*

*Overrides [Coder](coder.md).[constructor](coder.md#constructor)*

*Defined in [abi/abiCoder.ts:637](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L637)*

**Parameters:**

Name | Type |
------ | ------ |
`coerceFunc` | [CoerceFunc](../README.md#coercefunc) |
`localName` | string |

**Returns:** *[CoderBoolean](coderboolean.md)*

## Properties

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

*Defined in [abi/abiCoder.ts:646](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L646)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | `Uint8Array` |
`offset` | number |

**Returns:** *[DecodedResult](../interfaces/decodedresult.md)*

___

###  encode

▸ **encode**(`value`: boolean): *`Uint8Array`*

*Overrides [Coder](coder.md).[encode](coder.md#abstract-encode)*

*Defined in [abi/abiCoder.ts:642](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L642)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** *`Uint8Array`*