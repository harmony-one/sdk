> **[@harmony-js/account](../README.md)**

[HDNode](hdnode.md) /

# Class: HDNode

## Hierarchy

* `HDNode`

  * **HDNode**

## Index

### Constructors

* [constructor](hdnode.md#constructor)

### Properties

* [chainCode](hdnode.md#chaincode)
* [childKey](hdnode.md#private-optional-childkey)
* [entropy](hdnode.md#private-optional-entropy)
* [mnemonic](hdnode.md#private-optional-mnemonic)
* [path](hdnode.md#private-path)
* [privateKey](hdnode.md#privatekey)
* [publicKey](hdnode.md#publickey)

### Accessors

* [_privateKey](hdnode.md#_privatekey)
* [_publicKey](hdnode.md#_publickey)

### Methods

* [derive](hdnode.md#derive)
* [getChildKey](hdnode.md#getchildkey)
* [getEntropy](hdnode.md#getentropy)
* [lock](hdnode.md#lock)
* [unlock](hdnode.md#unlock)
* [add](hdnode.md#static-add)
* [fromMasterSeed](hdnode.md#static-frommasterseed)
* [generateMnemonic](hdnode.md#static-generatemnemonic)
* [isValidMnemonic](hdnode.md#static-isvalidmnemonic)
* [new](hdnode.md#static-new)

## Constructors

###  constructor

\+ **new HDNode**(`menmonic?`: undefined | string, `index`: number): *[HDNode](hdnode.md)*

*Overrides void*

*Defined in [hdnode.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`menmonic?` | undefined \| string | - |
`index` | number | 0 |

**Returns:** *[HDNode](hdnode.md)*

## Properties

###  chainCode

• **chainCode**: *`Buffer`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/node_modules/@types/hdkey/index.d.ts:12

___

### `Private` `Optional` childKey

• **childKey**? : *`hdkey`*

*Defined in [hdnode.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L29)*

___

### `Private` `Optional` entropy

• **entropy**? : *undefined | string*

*Defined in [hdnode.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L28)*

___

### `Private` `Optional` mnemonic

• **mnemonic**? : *undefined | string*

*Defined in [hdnode.ts:27](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L27)*

___

### `Private` path

• **path**: *string*

*Defined in [hdnode.ts:26](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L26)*

___

###  privateKey

• **privateKey**: *`Buffer`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/node_modules/@types/hdkey/index.d.ts:11

___

###  publicKey

• **publicKey**: *`Buffer`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/node_modules/@types/hdkey/index.d.ts:10

## Accessors

###  _privateKey

• **get _privateKey**(): *string*

*Defined in [hdnode.ts:76](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L76)*

**Returns:** *string*

___

###  _publicKey

• **get _publicKey**(): *string*

*Defined in [hdnode.ts:79](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L79)*

**Returns:** *string*

## Methods

###  derive

▸ **derive**(`path`: string): *`HDNode`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/node_modules/@types/hdkey/index.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *`HDNode`*

___

###  getChildKey

▸ **getChildKey**(`entropy`: string, `index`: number): *`HDNode`*

*Defined in [hdnode.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`entropy` | string |
`index` | number |

**Returns:** *`HDNode`*

___

###  getEntropy

▸ **getEntropy**(`mnemonic`: string): *string*

*Defined in [hdnode.ts:41](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`mnemonic` | string |

**Returns:** *string*

___

###  lock

▸ **lock**(`password`: string, `options`: `EncryptOptions`): *`Promise<void>`*

*Defined in [hdnode.ts:49](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`password` | string |
`options` | `EncryptOptions` |

**Returns:** *`Promise<void>`*

___

###  unlock

▸ **unlock**(`password`: string): *`Promise<void>`*

*Defined in [hdnode.ts:61](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`password` | string |

**Returns:** *`Promise<void>`*

___

### `Static` add

▸ **add**(`phrase`: string, `index`: number): *[HDNode](hdnode.md)*

*Defined in [hdnode.ts:14](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`phrase` | string |
`index` | number |

**Returns:** *[HDNode](hdnode.md)*

___

### `Static` fromMasterSeed

▸ **fromMasterSeed**(`seed`: `Buffer`): *`HDNode`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/node_modules/@types/hdkey/index.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`seed` | `Buffer` |

**Returns:** *`HDNode`*

___

### `Static` generateMnemonic

▸ **generateMnemonic**(): *string*

*Defined in [hdnode.ts:23](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L23)*

**Returns:** *string*

___

### `Static` isValidMnemonic

▸ **isValidMnemonic**(`phrase`: string): *boolean*

*Defined in [hdnode.ts:17](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`phrase` | string |

**Returns:** *boolean*

___

### `Static` new

▸ **new**(): *[HDNode](hdnode.md)*

*Defined in [hdnode.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/hdnode.ts#L11)*

**Returns:** *[HDNode](hdnode.md)*