> **[@harmony-js/account](../README.md)**

[Wallet](wallet.md) /

# Class: Wallet

## Hierarchy

* **Wallet**

## Index

### Constructors

* [constructor](wallet.md#constructor)

### Properties

* [accountMap](wallet.md#private-accountmap)
* [defaultSigner](wallet.md#protected-optional-defaultsigner)
* [messenger](wallet.md#messenger)

### Accessors

* [accounts](wallet.md#accounts)
* [signer](wallet.md#signer)

### Methods

* [addByKeyStore](wallet.md#addbykeystore)
* [addByMnemonic](wallet.md#addbymnemonic)
* [addByPrivateKey](wallet.md#addbyprivatekey)
* [createAccount](wallet.md#createaccount)
* [decryptAccount](wallet.md#decryptaccount)
* [encryptAccount](wallet.md#encryptaccount)
* [getAccount](wallet.md#getaccount)
* [isValidMnemonic](wallet.md#private-isvalidmnemonic)
* [newMnemonic](wallet.md#newmnemonic)
* [removeAccount](wallet.md#removeaccount)
* [setMessenger](wallet.md#setmessenger)
* [setSigner](wallet.md#setsigner)
* [signTransaction](wallet.md#signtransaction)
* [generateMnemonic](wallet.md#static-generatemnemonic)

## Constructors

###  constructor

\+ **new Wallet**(`messenger`: `Messenger`): *[Wallet](wallet.md)*

*Defined in [wallet.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L44)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`messenger` | `Messenger` |  defaultMessenger |

**Returns:** *[Wallet](wallet.md)*

## Properties

### `Private` accountMap

• **accountMap**: *`Map<string, Account>`* =  new Map()

*Defined in [wallet.ts:26](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L26)*

**`memberof`** Wallet

___

### `Protected` `Optional` defaultSigner

• **defaultSigner**? : *undefined | string*

*Defined in [wallet.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L21)*

___

###  messenger

• **messenger**: *`Messenger`*

*Defined in [wallet.ts:20](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L20)*

## Accessors

###  accounts

• **get accounts**(): *string[]*

*Defined in [wallet.ts:31](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L31)*

**`memberof`** Wallet

**Returns:** *string[]*

accounts addresses

___

###  signer

• **get signer**(): *[Account](account.md) | undefined*

*Defined in [wallet.ts:35](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L35)*

**Returns:** *[Account](account.md) | undefined*

## Methods

###  addByKeyStore

▸ **addByKeyStore**(`keyStore`: string, `password`: string): *`Promise<Account>`*

*Defined in [wallet.ts:110](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L110)*

**`function`** addByKeyStore

**`memberof`** Wallet

**`description`** add an account using privateKey

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`keyStore` | string | keystore jsonString to add |
`password` | string | password to decrypt the file |

**Returns:** *`Promise<Account>`*

return added Account

___

###  addByMnemonic

▸ **addByMnemonic**(`phrase`: string, `index`: number): *[Account](account.md)*

*Defined in [wallet.ts:65](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L65)*

**`function`** addByMnemonic

**`memberof`** Wallet

**`description`** add account using Mnemonic phrases

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`phrase` | string | - | Mnemonic phrase |
`index` | number | 0 | index to hdKey root  |

**Returns:** *[Account](account.md)*

___

###  addByPrivateKey

▸ **addByPrivateKey**(`privateKey`: string): *[Account](account.md)*

*Defined in [wallet.ts:84](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L84)*

**`function`** addByPrivateKey

**`memberof`** Wallet

**`description`** add an account using privateKey

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | string | privateKey to add |

**Returns:** *[Account](account.md)*

return added Account

___

###  createAccount

▸ **createAccount**(`password?`: undefined | string, `options?`: `EncryptOptions`): *`Promise<Account>`*

*Defined in [wallet.ts:134](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L134)*

**`function`** createAccount

**`description`** create a new account using Mnemonic

**Parameters:**

Name | Type |
------ | ------ |
`password?` | undefined \| string |
`options?` | `EncryptOptions` |

**Returns:** *`Promise<Account>`*

{description}

___

###  decryptAccount

▸ **decryptAccount**(`address`: string, `password`: string): *`Promise<Account>`*

*Defined in [wallet.ts:200](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L200)*

**`function`** decryptAccount

**`memberof`** Wallet

**`description`** to decrypt an account that lives in the wallet,if not encrypted, return original,
if not found, throw error

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | address in accounts |
`password` | string | string that used to encrypt |

**Returns:** *`Promise<Account>`*

___

###  encryptAccount

▸ **encryptAccount**(`address`: string, `password`: string, `options?`: `EncryptOptions`): *`Promise<Account>`*

*Defined in [wallet.ts:164](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L164)*

**`function`** encryptAccount

**`memberof`** Wallet

**`description`** to encrypt an account that lives in the wallet,
if encrypted, returns original one, if not found, throw error

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | address in accounts |
`password` | string | string that used to encrypt |
`options?` | `EncryptOptions` | encryption options |

**Returns:** *`Promise<Account>`*

___

###  getAccount

▸ **getAccount**(`address`: string): *[Account](account.md) | undefined*

*Defined in [wallet.ts:232](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L232)*

**`function`** getAccount

**`memberof`** Wallet

**`description`** get Account instance using address as param

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | address hex |

**Returns:** *[Account](account.md) | undefined*

Account instance which lives in Wallet

___

### `Private` isValidMnemonic

▸ **isValidMnemonic**(`phrase`: string): *boolean*

*Defined in [wallet.ts:324](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L324)*

**`function`** isValidMnemonic

**`memberof`** Wallet

**`description`** check if Mnemonic is valid

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`phrase` | string | Mnemonic phrase |

**Returns:** *boolean*

___

###  newMnemonic

▸ **newMnemonic**(): *string*

*Defined in [wallet.ts:54](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L54)*

**`function`** newMnemonic

**`memberof`** Wallet

**Returns:** *string*

Mnemonics

___

###  removeAccount

▸ **removeAccount**(`address`: string): *void*

*Defined in [wallet.ts:242](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L242)*

**`function`** removeAccount

**`memberof`** Wallet

**`description`** remove Account using address as param

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *void*

___

###  setMessenger

▸ **setMessenger**(`messenger`: `Messenger`): *void*

*Defined in [wallet.ts:249](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L249)*

**Parameters:**

Name | Type |
------ | ------ |
`messenger` | `Messenger` |

**Returns:** *void*

___

###  setSigner

▸ **setSigner**(`address`: string): *void*

*Defined in [wallet.ts:253](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L253)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *void*

___

###  signTransaction

▸ **signTransaction**(`transaction`: `Transaction`, `account`: [Account](account.md) | undefined, `password`: string | undefined, `updateNonce`: boolean, `encodeMode`: string, `blockNumber`: string): *`Promise<Transaction>`*

*Defined in [wallet.ts:260](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L260)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`transaction` | `Transaction` | - |
`account` | [Account](account.md) \| undefined |  this.signer |
`password` | string \| undefined |  undefined |
`updateNonce` | boolean | true |
`encodeMode` | string | "rlp" |
`blockNumber` | string | "latest" |

**Returns:** *`Promise<Transaction>`*

___

### `Static` generateMnemonic

▸ **generateMnemonic**(): *string*

*Defined in [wallet.ts:16](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/wallet.ts#L16)*

**Returns:** *string*