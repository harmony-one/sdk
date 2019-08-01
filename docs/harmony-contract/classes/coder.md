> **[@harmony-js/contract](../README.md)**

[Coder](coder.md) /

# Class: Coder

## Hierarchy

* **Coder**

  * [CoderAnonymous](coderanonymous.md)

  * [CoderNull](codernull.md)

  * [CoderNumber](codernumber.md)

  * [CoderBoolean](coderboolean.md)

  * [CoderFixedBytes](coderfixedbytes.md)

  * [CoderAddress](coderaddress.md)

  * [CoderDynamicBytes](coderdynamicbytes.md)

  * [CoderString](coderstring.md)

  * [CoderArray](coderarray.md)

  * [CoderTuple](codertuple.md)

## Index

### Constructors

* [constructor](coder.md#constructor)

### Properties

* [coerceFunc](coder.md#coercefunc)
* [dynamic](coder.md#dynamic)
* [localName](coder.md#optional-localname)
* [name](coder.md#name)
* [type](coder.md#type)

### Methods

* [decode](coder.md#abstract-decode)
* [encode](coder.md#abstract-encode)

## Constructors

###  constructor

\+ **new Coder**(`coerceFunc`: [CoerceFunc](../README.md#coercefunc), `name`: string, `type`: string, `localName`: string | undefined, `dynamic`: boolean): *[Coder](coder.md)*

*Defined in [abi/abiCoder.ts:490](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L490)*

**Parameters:**

Name | Type |
------ | ------ |
`coerceFunc` | [CoerceFunc](../README.md#coercefunc) |
`name` | string |
`type` | string |
`localName` | string \| undefined |
`dynamic` | boolean |

**Returns:** *[Coder](coder.md)*

## Properties

###  coerceFunc

• **coerceFunc**: *[CoerceFunc](../README.md#coercefunc)*

*Defined in [abi/abiCoder.ts:486](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L486)*

___

###  dynamic

• **dynamic**: *boolean*

*Defined in [abi/abiCoder.ts:490](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L490)*

___

### `Optional` localName

• **localName**? : *undefined | string*

*Defined in [abi/abiCoder.ts:489](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L489)*

___

###  name

• **name**: *string*

*Defined in [abi/abiCoder.ts:487](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L487)*

___

###  type

• **type**: *string*

*Defined in [abi/abiCoder.ts:488](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L488)*

## Methods

### `Abstract` decode

▸ **decode**(`data`: `Uint8Array`, `offset`: number): *[DecodedResult](../interfaces/decodedresult.md)*

*Defined in [abi/abiCoder.ts:506](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L506)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | `Uint8Array` |
`offset` | number |

**Returns:** *[DecodedResult](../interfaces/decodedresult.md)*

___

### `Abstract` encode

▸ **encode**(`value`: any): *`Uint8Array`*

*Defined in [abi/abiCoder.ts:505](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L505)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *`Uint8Array`*