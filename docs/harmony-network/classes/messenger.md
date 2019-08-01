> **[@harmony-js/network](../README.md)**

[Messenger](messenger.md) /

# Class: Messenger

**`class`** Messenger

**`description`** Messenger instance

**`param`** HttpProvider

**`param`** config object

**`returns`** Messenger instance

## Hierarchy

* `HarmonyCore`

  * **Messenger**

## Index

### Constructors

* [constructor](messenger.md#constructor)

### Properties

* [JsonRpc](messenger.md#jsonrpc)
* [Network_ID](messenger.md#network_id)
* [chainId](messenger.md#chainid)
* [chainPrefix](messenger.md#chainprefix)
* [chainType](messenger.md#chaintype)
* [config](messenger.md#optional-config)
* [getChainId](messenger.md#getchainid)
* [provider](messenger.md#provider)

### Methods

* [providerCheck](messenger.md#providercheck)
* [send](messenger.md#send)
* [setChainId](messenger.md#setchainid)
* [setChainType](messenger.md#setchaintype)
* [setNetworkID](messenger.md#setnetworkid)
* [setProvider](messenger.md#setprovider)
* [setRPCPrefix](messenger.md#setrpcprefix)
* [setReqMiddleware](messenger.md#setreqmiddleware)
* [setResMiddleware](messenger.md#setresmiddleware)
* [subscribe](messenger.md#subscribe)
* [unsubscribe](messenger.md#unsubscribe)

## Constructors

###  constructor

\+ **new Messenger**(`provider`: [HttpProvider](httpprovider.md) | [WSProvider](wsprovider.md), `chainType`: `ChainType`, `chainId`: `ChainID`, `config?`: undefined | object): *[Messenger](messenger.md)*

*Overrides void*

*Defined in [messenger/messenger.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`provider` | [HttpProvider](httpprovider.md) \| [WSProvider](wsprovider.md) | - |
`chainType` | `ChainType` |  defaultConfig.Default.Chain_Type |
`chainId` | `ChainID` |  defaultConfig.Default.Chain_ID |
`config?` | undefined \| object | - |

**Returns:** *[Messenger](messenger.md)*

## Properties

###  JsonRpc

• **JsonRpc**: *[JsonRpc](jsonrpc.md)*

*Defined in [messenger/messenger.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L28)*

___

###  Network_ID

• **Network_ID**: *string* = "Default"

*Defined in [messenger/messenger.ts:27](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L27)*

___

###  chainId

• **chainId**: *`ChainID`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-utils/dist/chain.d.ts:35

___

###  chainPrefix

• **chainPrefix**: *string*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-utils/dist/chain.d.ts:37

___

###  chainType

• **chainType**: *`ChainType`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-utils/dist/chain.d.ts:34

___

### `Optional` config

• **config**? : *undefined | object*

*Defined in [messenger/messenger.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L25)*

___

###  getChainId

• **getChainId**: *`ChainID`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-utils/dist/chain.d.ts:38

___

###  provider

• **provider**: *[HttpProvider](httpprovider.md) | [WSProvider](wsprovider.md)*

*Defined in [messenger/messenger.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L24)*

## Methods

###  providerCheck

▸ **providerCheck**(): *void*

*Defined in [messenger/messenger.ts:119](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L119)*

**`function`** providerCheck

**`memberof`** Messenger

**`description`** provider checker

**Returns:** *void*

provider validator

___

###  send

▸ **send**(`method`: [RPCMethod](../enums/rpcmethod.md) | string, `params?`: string | any[] | undefined, `rpcPrefix?`: undefined | string): *`Promise<any>`*

*Defined in [messenger/messenger.ts:74](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L74)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method` | [RPCMethod](../enums/rpcmethod.md) \| string | RPC method |
`params?` | string \| any[] \| undefined | RPC method params |
`rpcPrefix?` | undefined \| string | - |

**Returns:** *`Promise<any>`*

RPC result

___

###  setChainId

▸ **setChainId**(`chainId`: `ChainID`): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-utils/dist/chain.d.ts:39

**Parameters:**

Name | Type |
------ | ------ |
`chainId` | `ChainID` |

**Returns:** *void*

___

###  setChainType

▸ **setChainType**(`chainType`: `ChainType`): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-utils/dist/chain.d.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`chainType` | `ChainType` |

**Returns:** *void*

___

###  setNetworkID

▸ **setNetworkID**(`id`: string): *void*

*Defined in [messenger/messenger.ts:153](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L153)*

**`function`** setNetworkID

**`description`** set network id

**`memberof`** Messenger

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string | network id string  |

**Returns:** *void*

___

###  setProvider

▸ **setProvider**(`provider`: [HttpProvider](httpprovider.md) | [WSProvider](wsprovider.md)): *void*

*Defined in [messenger/messenger.ts:109](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L109)*

**`function`** setProvider

**`memberof`** Messenger

**`description`** provider setter

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`provider` | [HttpProvider](httpprovider.md) \| [WSProvider](wsprovider.md) | provider instance  |

**Returns:** *void*

___

###  setRPCPrefix

▸ **setRPCPrefix**(`method`: [RPCMethod](../enums/rpcmethod.md) | string, `prefix`: string): *string*

*Defined in [messenger/messenger.ts:157](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | [RPCMethod](../enums/rpcmethod.md) \| string |
`prefix` | string |

**Returns:** *string*

___

###  setReqMiddleware

▸ **setReqMiddleware**(`middleware`: any, `method`: string): *void*

*Defined in [messenger/messenger.ts:132](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L132)*

**`function`** setReqMiddleware

**`description`** set request middleware

**`memberof`** Messenger

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`middleware` | any | - | middle ware for req |
`method` | string | "*" | method name  |

**Returns:** *void*

___

###  setResMiddleware

▸ **setResMiddleware**(`middleware`: any, `method`: string): *void*

*Defined in [messenger/messenger.ts:143](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L143)*

**`function`** setResMiddleware

**`description`** set response middleware

**`memberof`** Messenger

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`middleware` | any | - | middle ware for req |
`method` | string | "*" | method name  |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`method`: [RPCMethod](../enums/rpcmethod.md) | string, `params?`: string | any[] | undefined, `returnType`: [SubscribeReturns](../enums/subscribereturns.md), `rpcPrefix`: string): *`Promise<any>`*

*Defined in [messenger/messenger.ts:166](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L166)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`method` | [RPCMethod](../enums/rpcmethod.md) \| string | - |
`params?` | string \| any[] \| undefined | - |
`returnType` | [SubscribeReturns](../enums/subscribereturns.md) |  SubscribeReturns.all |
`rpcPrefix` | string |  this.chainPrefix |

**Returns:** *`Promise<any>`*

___

###  unsubscribe

▸ **unsubscribe**(`method`: [RPCMethod](../enums/rpcmethod.md) | string, `params?`: string | any[] | undefined, `rpcPrefix?`: undefined | string): *`Promise<any>`*

*Defined in [messenger/messenger.ts:211](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/messenger.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | [RPCMethod](../enums/rpcmethod.md) \| string |
`params?` | string \| any[] \| undefined |
`rpcPrefix?` | undefined \| string |

**Returns:** *`Promise<any>`*