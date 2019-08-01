> **[@harmony-js/contract](../README.md)**

[CoderFixedBytes](coderfixedbytes.md) /

# Class: CoderFixedBytes

## Hierarchy

* [Coder](coder.md)

  * **CoderFixedBytes**

## Index

### Constructors

* [constructor](coderfixedbytes.md#constructor)

### Properties

* [coerceFunc](coderfixedbytes.md#coercefunc)
* [dynamic](coderfixedbytes.md#dynamic)
* [length](coderfixedbytes.md#length)
* [localName](coderfixedbytes.md#optional-localname)
* [name](coderfixedbytes.md#name)
* [type](coderfixedbytes.md#type)

### Methods

* [decode](coderfixedbytes.md#decode)
* [encode](coderfixedbytes.md#encode)

## Constructors

###  constructor

\+ **new CoderFixedBytes**(`coerceFunc`: [CoerceFunc](../README.md#coercefunc), `length`: number, `localName`: string): *[CoderFixedBytes](coderfixedbytes.md)*

*Overrides [Coder](coder.md).[constructor](coder.md#constructor)*

*Defined in [abi/abiCoder.ts:669](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L669)*

**Parameters:**

Name | Type |
------ | ------ |
`coerceFunc` | [CoerceFunc](../README.md#coercefunc) |
`length` | number |
`localName` | string |

**Returns:** *[CoderFixedBytes](coderfixedbytes.md)*

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

###  length

• **length**: *number*

*Defined in [abi/abiCoder.ts:669](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L669)*

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

*Defined in [abi/abiCoder.ts:703](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L703)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | `Uint8Array` |
`offset` | number |

**Returns:** *[DecodedResult](../interfaces/decodedresult.md)*

___

###  encode

▸ **encode**(`value`: `Arrayish`): *`Uint8Array`*

*Overrides [Coder](coder.md).[encode](coder.md#abstract-encode)*

*Defined in [abi/abiCoder.ts:676](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L676)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | `Arrayish` |

**Returns:** *`Uint8Array`*