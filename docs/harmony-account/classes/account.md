> **[@harmony-js/account](../README.md)**

[Account](account.md) /

# Class: Account

## Hierarchy

* **Account**

## Index

### Constructors

* [constructor](account.md#constructor)

### Properties

* [address](account.md#optional-address)
* [balance](account.md#optional-balance)
* [encrypted](account.md#encrypted)
* [messenger](account.md#messenger)
* [nonce](account.md#optional-nonce)
* [privateKey](account.md#optional-privatekey)
* [publicKey](account.md#optional-publickey)
* [shards](account.md#shards)

### Accessors

* [bech32Address](account.md#bech32address)
* [bech32TestNetAddress](account.md#bech32testnetaddress)
* [checksumAddress](account.md#checksumaddress)
* [getShardsCount](account.md#getshardscount)

### Methods

* [_import](account.md#private-_import)
* [_new](account.md#private-_new)
* [fromFile](account.md#fromfile)
* [getBalance](account.md#getbalance)
* [setMessenger](account.md#setmessenger)
* [signTransaction](account.md#signtransaction)
* [toFile](account.md#tofile)
* [updateShards](account.md#updateshards)
* [add](account.md#static-add)
* [new](account.md#static-new)

## Constructors

###  constructor

\+ **new Account**(`key?`: undefined | string, `messenger`: `Messenger`): *[Account](account.md)*

*Defined in [account.ts:68](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L68)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`key?` | undefined \| string | - |
`messenger` | `Messenger` |  defaultMessenger |

**Returns:** *[Account](account.md)*

## Properties

### `Optional` address

• **address**? : *undefined | string*

*Defined in [account.ts:41](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L41)*

___

### `Optional` balance

• **balance**? : *undefined | string* = "0"

*Defined in [account.ts:42](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L42)*

___

###  encrypted

• **encrypted**: *boolean* = false

*Defined in [account.ts:46](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L46)*

___

###  messenger

• **messenger**: *`Messenger`*

*Defined in [account.ts:45](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L45)*

___

### `Optional` nonce

• **nonce**? : *undefined | number* = 0

*Defined in [account.ts:43](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L43)*

___

### `Optional` privateKey

• **privateKey**? : *undefined | string*

*Defined in [account.ts:39](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L39)*

___

### `Optional` publicKey

• **publicKey**? : *undefined | string*

*Defined in [account.ts:40](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L40)*

___

###  shards

• **shards**: *[Shards](../README.md#shards)* =  new Map().set('default', '')

*Defined in [account.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L44)*

## Accessors

###  bech32Address

• **get bech32Address**(): *string*

*Defined in [account.ts:55](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L55)*

**Returns:** *string*

___

###  bech32TestNetAddress

• **get bech32TestNetAddress**(): *string*

*Defined in [account.ts:58](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L58)*

**Returns:** *string*

___

###  checksumAddress

• **get checksumAddress**(): *string*

*Defined in [account.ts:52](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L52)*

**`function`** checksumAddress checsumAddress getter

**Returns:** *string*

get the checksumAddress

___

###  getShardsCount

• **get getShardsCount**(): *number*

*Defined in [account.ts:66](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L66)*

**`function`** getShardsCount getShards number with this Account

**Returns:** *number*

shard size

## Methods

### `Private` _import

▸ **_import**(`key`: string): *[Account](account.md)*

*Defined in [account.ts:205](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L205)*

**`function`** _import private method import a private Key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | private key |

**Returns:** *[Account](account.md)*

Account instance

___

### `Private` _new

▸ **_new**(): *[Account](account.md)*

*Defined in [account.ts:192](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L192)*

**`function`** _new private method create Account

**Returns:** *[Account](account.md)*

Account instance

___

###  fromFile

▸ **fromFile**(`keyStore`: string, `password`: string): *`Promise<Account>`*

*Defined in [account.ts:90](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`keyStore` | string |
`password` | string |

**Returns:** *`Promise<Account>`*

___

###  getBalance

▸ **getBalance**(`blockNumber`: string): *`Promise<object>`*

*Defined in [account.ts:111](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L111)*

**`function`** getBalance get Account's balance

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`blockNumber` | string | "latest" |

**Returns:** *`Promise<object>`*

{description}

___

###  setMessenger

▸ **setMessenger**(`messenger`: `Messenger`): *void*

*Defined in [account.ts:185](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L185)*

**Parameters:**

Name | Type |
------ | ------ |
`messenger` | `Messenger` |

**Returns:** *void*

___

###  signTransaction

▸ **signTransaction**(`transaction`: `Transaction`, `updateNonce`: boolean, `encodeMode`: string, `blockNumber`: string): *`Promise<Transaction>`*

*Defined in [account.ts:153](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L153)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | `Transaction` | - |
`updateNonce` | boolean | true |
`encodeMode` | string | "rlp" |
`blockNumber` | string | "latest" |

**Returns:** *`Promise<Transaction>`*

___

###  toFile

▸ **toFile**(`password`: string, `options?`: `EncryptOptions`): *`Promise<string>`*

*Defined in [account.ts:79](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`password` | string |
`options?` | `EncryptOptions` |

**Returns:** *`Promise<string>`*

___

###  updateShards

▸ **updateShards**(): *`Promise<string>`*

*Defined in [account.ts:149](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L149)*

**`function`** updateShards

**Returns:** *`Promise<string>`*

{description}

___

### `Static` add

▸ **add**(`key`: string): *[Account](account.md)*

*Defined in [account.ts:34](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L34)*

**`function`** add static method add a private key to Account

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | private Key |

**Returns:** *[Account](account.md)*

Account instance

___

### `Static` new

▸ **new**(): *[Account](account.md)*

*Defined in [account.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/account.ts#L25)*

**`function`** new static method create account

**Returns:** *[Account](account.md)*

Account instance