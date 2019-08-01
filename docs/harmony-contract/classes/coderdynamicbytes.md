> **[@harmony-js/contract](../README.md)**

[CoderDynamicBytes](coderdynamicbytes.md) /

# Class: CoderDynamicBytes

## Hierarchy

* [Coder](coder.md)

  * **CoderDynamicBytes**

## Index

### Constructors

* [constructor](coderdynamicbytes.md#constructor)

### Properties

* [coerceFunc](coderdynamicbytes.md#coercefunc)
* [dynamic](coderdynamicbytes.md#dynamic)
* [localName](coderdynamicbytes.md#optional-localname)
* [name](coderdynamicbytes.md#name)
* [type](coderdynamicbytes.md#type)

### Methods

* [decode](coderdynamicbytes.md#decode)
* [encode](coderdynamicbytes.md#encode)

## Constructors

###  constructor

\+ **new CoderDynamicBytes**(`coerceFunc`: [CoerceFunc](../README.md#coercefunc), `localName`: string): *[CoderDynamicBytes](coderdynamicbytes.md)*

*Overrides [Coder](coder.md).[constructor](coder.md#constructor)*

*Defined in [abi/abiCoder.ts:806](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L806)*

**Parameters:**

Name | Type |
------ | ------ |
`coerceFunc` | [CoerceFunc](../README.md#coercefunc) |
`localName` | string |

**Returns:** *[CoderDynamicBytes](coderdynamicbytes.md)*

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

*Defined in [abi/abiCoder.ts:824](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L824)*

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

*Defined in [abi/abiCoder.ts:810](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L810)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | `Arrayish` |

**Returns:** *`Uint8Array`*