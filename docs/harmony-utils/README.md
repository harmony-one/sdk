> **[@harmony-js/utils](README.md)**

## Index

### Enumerations

* [AssertType](enums/asserttype.md)
* [ChainID](enums/chainid.md)
* [ChainType](enums/chaintype.md)
* [DefaultBlockParams](enums/defaultblockparams.md)
* [Units](enums/units.md)

### Classes

* [HarmonyCore](classes/harmonycore.md)
* [Unit](classes/unit.md)

### Variables

* [HDPath](README.md#const-hdpath)
* [unitMap](README.md#const-unitmap)

### Functions

* [add0xToString](README.md#const-add0xtostring)
* [assertObject](README.md#const-assertobject)
* [defineReadOnly](README.md#definereadonly)
* [fromWei](README.md#const-fromwei)
* [generateValidateObjects](README.md#generatevalidateobjects)
* [hexToBN](README.md#const-hextobn)
* [hexToNumber](README.md#const-hextonumber)
* [isAddress](README.md#const-isaddress)
* [isArray](README.md#const-isarray)
* [isBech32Address](README.md#const-isbech32address)
* [isBech32TestNetAddress](README.md#const-isbech32testnetaddress)
* [isBlockNumber](README.md#const-isblocknumber)
* [isBoolean](README.md#const-isboolean)
* [isFunction](README.md#const-isfunction)
* [isHash](README.md#const-ishash)
* [isHex](README.md#const-ishex)
* [isHttp](README.md#const-ishttp)
* [isInt](README.md#const-isint)
* [isJsonString](README.md#const-isjsonstring)
* [isKeyString](README.md#const-iskeystring)
* [isNumber](README.md#const-isnumber)
* [isObject](README.md#const-isobject)
* [isPrivateKey](README.md#const-isprivatekey)
* [isPublicKey](README.md#const-ispublickey)
* [isString](README.md#const-isstring)
* [isValidAddress](README.md#const-isvalidaddress)
* [isWs](README.md#const-isws)
* [numToStr](README.md#const-numtostr)
* [numberToHex](README.md#const-numbertohex)
* [numberToString](README.md#const-numbertostring)
* [strip0x](README.md#const-strip0x)
* [toWei](README.md#const-towei)
* [validateArgs](README.md#validateargs)

### Object literals

* [DEFAULT_OPTIONS](README.md#const-default_options)
* [defaultConfig](README.md#const-defaultconfig)
* [validatorArray](README.md#const-validatorarray)

## Variables

### `Const` HDPath

• **HDPath**: *"m/44'/60'/0'/0/"* =  `m/44'/60'/0'/0/`

*Defined in [chain.ts:70](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L70)*

___

### `Const` unitMap

• **unitMap**: *`Map<Units, string>`* =  new Map([
  [Units.wei, '1'],
  [Units.kwei, '1000'], // 1e3 wei
  [Units.Mwei, '1000000'], // 1e6 wei
  [Units.Gwei, '1000000000'], // 1e9 wei
  [Units.szabo, '1000000000000'], // 1e12 wei
  [Units.finney, '1000000000000000'], // 1e15 wei
  [Units.ether, '1000000000000000000'], // 1e18 wei
  [Units.Kether, '1000000000000000000000'], // 1e21 wei
  [Units.Mether, '1000000000000000000000000'], // 1e24 wei
  [Units.Gether, '1000000000000000000000000000'], // 1e27 wei
  [Units.Tether, '1000000000000000000000000000000'], // 1e30 wei
])

*Defined in [transformers.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L18)*

## Functions

### `Const` add0xToString

▸ **add0xToString**(`obj`: string): *string*

*Defined in [transformers.ts:70](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | string |

**Returns:** *string*

___

### `Const` assertObject

▸ **assertObject**(`input`: any): *`(Anonymous function)`*

*Defined in [utils.ts:111](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | any |

**Returns:** *`(Anonymous function)`*

___

###  defineReadOnly

▸ **defineReadOnly**(`object`: any, `name`: string, `value`: any): *void*

*Defined in [tools.ts:1](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/tools.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`object` | any |
`name` | string |
`value` | any |

**Returns:** *void*

___

### `Const` fromWei

▸ **fromWei**(`wei`: `BN` | string, `unit`: [Units](enums/units.md), `options`: any): *string*

*Defined in [transformers.ts:172](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L172)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`wei` | `BN` \| string | - |
`unit` | [Units](enums/units.md) | - |
`options` | any |  DEFAULT_OPTIONS |

**Returns:** *string*

___

###  generateValidateObjects

▸ **generateValidateObjects**(`validatorObject`: object): *object*

*Defined in [utils.ts:91](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`validatorObject` | object |

**Returns:** *object*

* **optionalArgs**: *any*

* **requiredArgs**: *any*

___

### `Const` hexToBN

▸ **hexToBN**(`hex`: string): *`BN`*

*Defined in [transformers.ts:103](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`hex` | string |

**Returns:** *`BN`*

___

### `Const` hexToNumber

▸ **hexToNumber**(`hex`: string): *string*

*Defined in [transformers.ts:92](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`hex` | string |

**Returns:** *string*

___

### `Const` isAddress

▸ **isAddress**(`address`: string): *boolean*

*Defined in [validators.ts:6](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *boolean*

___

### `Const` isArray

▸ **isArray**(`obj`: any): *boolean*

*Defined in [validators.ts:72](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L72)*

[isArray verify param input is an Array]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[boolean]

___

### `Const` isBech32Address

▸ **isBech32Address**(`raw`: string): *boolean*

*Defined in [validators.ts:163](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`raw` | string |

**Returns:** *boolean*

___

### `Const` isBech32TestNetAddress

▸ **isBech32TestNetAddress**(`raw`: string): *boolean*

*Defined in [validators.ts:168](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L168)*

**Parameters:**

Name | Type |
------ | ------ |
`raw` | string |

**Returns:** *boolean*

___

### `Const` isBlockNumber

▸ **isBlockNumber**(`obj`: any): *boolean*

*Defined in [validators.ts:148](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Const` isBoolean

▸ **isBoolean**(`obj`: any): *boolean*

*Defined in [validators.ts:62](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L62)*

[isBoolean verify param is a Boolean]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[boolean]

___

### `Const` isFunction

▸ **isFunction**(`obj`: any): *boolean*

*Defined in [validators.ts:107](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L107)*

[isFunction verify param is a Function]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[description]

___

### `Const` isHash

▸ **isHash**(`hash`: string): *boolean*

*Defined in [validators.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** *boolean*

___

### `Const` isHex

▸ **isHex**(`obj`: any): *boolean*

*Defined in [validators.ts:112](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Const` isHttp

▸ **isHttp**(`obj`: any): *boolean*

*Defined in [validators.ts:124](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Const` isInt

▸ **isInt**(`obj`: any): *boolean*

*Defined in [validators.ts:41](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L41)*

[isNumber verify param is a Number]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[boolean]

___

### `Const` isJsonString

▸ **isJsonString**(`obj`: any): *boolean*

*Defined in [validators.ts:82](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L82)*

[isJson verify param input is a Json]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[boolean]

___

### `Const` isKeyString

▸ **isKeyString**(`keyString`: string, `lengh`: number): *boolean*

*Defined in [validators.ts:1](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`keyString` | string |
`lengh` | number |

**Returns:** *boolean*

___

### `Const` isNumber

▸ **isNumber**(`obj`: any): *boolean*

*Defined in [validators.ts:31](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L31)*

[isNumber verify param is a Number]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[boolean]

___

### `Const` isObject

▸ **isObject**(`obj`: any): *boolean*

*Defined in [validators.ts:96](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L96)*

[isObject verify param is an Object]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[boolean]

___

### `Const` isPrivateKey

▸ **isPrivateKey**(`privateKey`: string): *boolean*

*Defined in [validators.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | string |

**Returns:** *boolean*

___

### `Const` isPublicKey

▸ **isPublicKey**(`publicKey`: string): *boolean*

*Defined in [validators.ts:16](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | string |

**Returns:** *boolean*

___

### `Const` isString

▸ **isString**(`obj`: any): *boolean*

*Defined in [validators.ts:52](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L52)*

[isString verify param is a String]

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

[boolean]

___

### `Const` isValidAddress

▸ **isValidAddress**(`address`: string): *boolean*

*Defined in [validators.ts:173](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *boolean*

___

### `Const` isWs

▸ **isWs**(`obj`: any): *boolean*

*Defined in [validators.ts:133](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/validators.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *boolean*

___

### `Const` numToStr

▸ **numToStr**(`input`: any): *string*

*Defined in [transformers.ts:51](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | any |

**Returns:** *string*

___

### `Const` numberToHex

▸ **numberToHex**(`obj`: any): *string*

*Defined in [transformers.ts:84](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *string*

___

### `Const` numberToString

▸ **numberToString**(`obj`: `BN` | number | string, `radix`: number): *string*

*Defined in [transformers.ts:36](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L36)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`obj` | `BN` \| number \| string | - |
`radix` | number | 10 |

**Returns:** *string*

___

### `Const` strip0x

▸ **strip0x**(`obj`: string): *string*

*Defined in [transformers.ts:80](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | string |

**Returns:** *string*

___

### `Const` toWei

▸ **toWei**(`input`: `BN` | string, `unit`: [Units](enums/units.md)): *`BN`*

*Defined in [transformers.ts:114](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | `BN` \| string |
`unit` | [Units](enums/units.md) |

**Returns:** *`BN`*

___

###  validateArgs

▸ **validateArgs**(`args`: any, `requiredArgs`: any, `optionalArgs`: any): *boolean*

*Defined in [utils.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |
`requiredArgs` | any |
`optionalArgs` | any |

**Returns:** *boolean*

## Object literals

### `Const` DEFAULT_OPTIONS

### ▪ **DEFAULT_OPTIONS**: *object*

*Defined in [transformers.ts:32](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L32)*

###  pad

• **pad**: *boolean* = false

*Defined in [transformers.ts:33](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/transformers.ts#L33)*

___

### `Const` defaultConfig

### ▪ **defaultConfig**: *object*

*Defined in [chain.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L21)*

▪ **Default**: *object*

*Defined in [chain.ts:22](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L22)*

* **Chain_ID**: *[ChainID](enums/chainid.md)* =  ChainID.Default

* **Chain_Type**: *[ChainType](enums/chaintype.md)* =  ChainType.Harmony

* **Chain_URL**: *string* = "http://localhost:9500"

* **Network_ID**: *string* = "Local"

▪ **DefaultWS**: *object*

*Defined in [chain.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/chain.ts#L28)*

* **Chain_ID**: *[ChainID](enums/chainid.md)* =  ChainID.Default

* **Chain_Type**: *[ChainType](enums/chaintype.md)* =  ChainType.Harmony

* **Chain_URL**: *string* = "ws://localhost:9800"

* **Network_ID**: *string* = "LocalWS"

___

### `Const` validatorArray

### ▪ **validatorArray**: *object*

*Defined in [utils.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L25)*

###  isAddress

• **isAddress**: *`isAddress`[]* =  [isAddress]

*Defined in [utils.ts:36](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L36)*

###  isArray

• **isArray**: *`isArray`[]* =  [isArray]

*Defined in [utils.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L29)*

###  isBech32Address

• **isBech32Address**: *`isBech32Address`[]* =  [isBech32Address]

*Defined in [utils.ts:39](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L39)*

###  isBech32TestNetAddress

• **isBech32TestNetAddress**: *`isBech32TestNetAddress`[]* =  [isBech32TestNetAddress]

*Defined in [utils.ts:40](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L40)*

###  isBlockNumber

• **isBlockNumber**: *`isBlockNumber`[]* =  [isBlockNumber]

*Defined in [utils.ts:38](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L38)*

###  isBoolean

• **isBoolean**: *`isBoolean`[]* =  [isBoolean]

*Defined in [utils.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L28)*

###  isFunction

• **isFunction**: *`isFunction`[]* =  [isFunction]

*Defined in [utils.ts:32](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L32)*

###  isHash

• **isHash**: *`isHash`[]* =  [isHash]

*Defined in [utils.ts:37](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L37)*

###  isHex

• **isHex**: *`isHex`[]* =  [isHex]

*Defined in [utils.ts:33](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L33)*

###  isJsonString

• **isJsonString**: *`isJsonString`[]* =  [isJsonString]

*Defined in [utils.ts:30](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L30)*

###  isNumber

• **isNumber**: *`isNumber`[]* =  [isNumber]

*Defined in [utils.ts:26](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L26)*

###  isObject

• **isObject**: *`isObject`[]* =  [isObject]

*Defined in [utils.ts:31](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L31)*

###  isPrivateKey

• **isPrivateKey**: *`isPrivateKey`[]* =  [isPrivateKey]

*Defined in [utils.ts:35](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L35)*

###  isPublicKey

• **isPublicKey**: *`isPublicKey`[]* =  [isPublicKey]

*Defined in [utils.ts:34](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L34)*

###  isString

• **isString**: *`isString`[]* =  [isString]

*Defined in [utils.ts:27](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L27)*

###  isValidAddress

• **isValidAddress**: *`isValidAddress`[]* =  [isValidAddress]

*Defined in [utils.ts:41](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-utils/src/utils.ts#L41)*