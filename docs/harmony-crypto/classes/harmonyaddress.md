> **[@harmony-js/crypto](../README.md)**

[HarmonyAddress](harmonyaddress.md) /

# Class: HarmonyAddress

## Hierarchy

* **HarmonyAddress**

## Index

### Constructors

* [constructor](harmonyaddress.md#constructor)

### Properties

* [basic](harmonyaddress.md#basic)
* [raw](harmonyaddress.md#raw)

### Accessors

* [basicHex](harmonyaddress.md#basichex)
* [bech32](harmonyaddress.md#bech32)
* [bech32TestNet](harmonyaddress.md#bech32testnet)
* [checksum](harmonyaddress.md#checksum)

### Methods

* [getBasic](harmonyaddress.md#private-getbasic)
* [isValidBasic](harmonyaddress.md#static-isvalidbasic)
* [isValidBech32](harmonyaddress.md#static-isvalidbech32)
* [isValidBech32TestNet](harmonyaddress.md#static-isvalidbech32testnet)
* [isValidChecksum](harmonyaddress.md#static-isvalidchecksum)

## Constructors

###  constructor

\+ **new HarmonyAddress**(`raw`: string): *[HarmonyAddress](harmonyaddress.md)*

*Defined in [address.ts:48](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`raw` | string |

**Returns:** *[HarmonyAddress](harmonyaddress.md)*

## Properties

###  basic

• **basic**: *string*

*Defined in [address.ts:35](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L35)*

___

###  raw

• **raw**: *string*

*Defined in [address.ts:34](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L34)*

## Accessors

###  basicHex

• **get basicHex**(): *string*

*Defined in [address.ts:36](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L36)*

**Returns:** *string*

___

###  bech32

• **get bech32**(): *string*

*Defined in [address.ts:43](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L43)*

**Returns:** *string*

___

###  bech32TestNet

• **get bech32TestNet**(): *string*

*Defined in [address.ts:46](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L46)*

**Returns:** *string*

___

###  checksum

• **get checksum**(): *string*

*Defined in [address.ts:39](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L39)*

**Returns:** *string*

## Methods

### `Private` getBasic

▸ **getBasic**(`addr`: string): *string*

*Defined in [address.ts:55](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`addr` | string |

**Returns:** *string*

___

### `Static` isValidBasic

▸ **isValidBasic**(`str`: string): *boolean*

*Defined in [address.ts:12](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *boolean*

___

### `Static` isValidBech32

▸ **isValidBech32**(`str`: string): *boolean*

*Defined in [address.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *boolean*

___

### `Static` isValidBech32TestNet

▸ **isValidBech32TestNet**(`str`: string): *boolean*

*Defined in [address.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *boolean*

___

### `Static` isValidChecksum

▸ **isValidChecksum**(`str`: string): *boolean*

*Defined in [address.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-crypto/src/address.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *boolean*