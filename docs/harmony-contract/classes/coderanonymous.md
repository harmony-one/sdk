> **[@harmony-js/contract](../README.md)**

[CoderAnonymous](coderanonymous.md) /

# Class: CoderAnonymous

## Hierarchy

* [Coder](coder.md)

  * **CoderAnonymous**

## Index

### Constructors

* [constructor](coderanonymous.md#constructor)

### Properties

* [coder](coderanonymous.md#private-coder)
* [coerceFunc](coderanonymous.md#coercefunc)
* [dynamic](coderanonymous.md#dynamic)
* [localName](coderanonymous.md#optional-localname)
* [name](coderanonymous.md#name)
* [type](coderanonymous.md#type)

### Methods

* [decode](coderanonymous.md#decode)
* [encode](coderanonymous.md#encode)

## Constructors

###  constructor

\+ **new CoderAnonymous**(`coder`: [Coder](coder.md)): *[CoderAnonymous](coderanonymous.md)*

*Overrides [Coder](coder.md).[constructor](coder.md#constructor)*

*Defined in [abi/abiCoder.ts:512](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L512)*

**Parameters:**

Name | Type |
------ | ------ |
`coder` | [Coder](coder.md) |

**Returns:** *[CoderAnonymous](coderanonymous.md)*

## Properties

### `Private` coder

• **coder**: *[Coder](coder.md)*

*Defined in [abi/abiCoder.ts:512](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L512)*

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

*Defined in [abi/abiCoder.ts:520](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L520)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | `Uint8Array` |
`offset` | number |

**Returns:** *[DecodedResult](../interfaces/decodedresult.md)*

___

###  encode

▸ **encode**(`value`: any): *`Uint8Array`*

*Overrides [Coder](coder.md).[encode](coder.md#abstract-encode)*

*Defined in [abi/abiCoder.ts:517](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/abiCoder.ts#L517)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *`Uint8Array`*