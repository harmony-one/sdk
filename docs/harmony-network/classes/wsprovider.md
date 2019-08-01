> **[@harmony-js/network](../README.md)**

[WSProvider](wsprovider.md) /

# Class: WSProvider

## Hierarchy

  * [BaseSocket](basesocket.md)

  * **WSProvider**

  * [SubscriptionMethod](subscriptionmethod.md)

## Index

### Constructors

* [constructor](wsprovider.md#constructor)

### Properties

* [connection](wsprovider.md#connection)
* [emitter](wsprovider.md#emitter)
* [handlers](wsprovider.md#handlers)
* [jsonRpc](wsprovider.md#jsonrpc)
* [options](wsprovider.md#options)
* [reqMiddleware](wsprovider.md#protected-reqmiddleware)
* [resMiddleware](wsprovider.md#protected-resmiddleware)
* [subscriptions](wsprovider.md#subscriptions)
* [url](wsprovider.md#url)

### Accessors

* [connected](wsprovider.md#connected)

### Methods

* [addEventListener](wsprovider.md#addeventlistener)
* [clearSubscriptions](wsprovider.md#clearsubscriptions)
* [createWebsocketProvider](wsprovider.md#createwebsocketprovider)
* [getMiddleware](wsprovider.md#protected-getmiddleware)
* [getSubscriptionEvent](wsprovider.md#getsubscriptionevent)
* [hasSubscription](wsprovider.md#hassubscription)
* [isConnecting](wsprovider.md#isconnecting)
* [on](wsprovider.md#on)
* [onClose](wsprovider.md#onclose)
* [onConnect](wsprovider.md#onconnect)
* [onData](wsprovider.md#ondata)
* [onError](wsprovider.md#onerror)
* [onMessage](wsprovider.md#onmessage)
* [onReady](wsprovider.md#onready)
* [once](wsprovider.md#once)
* [pushMiddleware](wsprovider.md#protected-pushmiddleware)
* [reconnect](wsprovider.md#reconnect)
* [registerEventListeners](wsprovider.md#registereventlisteners)
* [removeAllSocketListeners](wsprovider.md#removeallsocketlisteners)
* [removeEventListener](wsprovider.md#removeeventlistener)
* [reset](wsprovider.md#reset)
* [resetHandlers](wsprovider.md#resethandlers)
* [send](wsprovider.md#send)
* [subscribe](wsprovider.md#subscribe)
* [unsubscribe](wsprovider.md#unsubscribe)
* [validate](wsprovider.md#validate)

### Object literals

* [middlewares](wsprovider.md#middlewares)

## Constructors

###  constructor

\+ **new WSProvider**(`url`: string, `options`: any): *[WSProvider](wsprovider.md)*

*Overrides [BaseSocket](basesocket.md).[constructor](basesocket.md#constructor)*

*Defined in [providers/ws.ts:23](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L23)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`options` | any |  {} |

**Returns:** *[WSProvider](wsprovider.md)*

## Properties

###  connection

• **connection**: *`W3CWebsocket` | `WebSocket`*

*Defined in [providers/ws.ts:22](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L22)*

___

###  emitter

• **emitter**: *`Emitter`*

*Inherited from [BaseSocket](basesocket.md).[emitter](basesocket.md#emitter)*

*Defined in [providers/baseSocket.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L29)*

___

###  handlers

• **handlers**: *any*

*Inherited from [BaseSocket](basesocket.md).[handlers](basesocket.md#handlers)*

*Defined in [providers/baseSocket.ts:30](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L30)*

___

###  jsonRpc

• **jsonRpc**: *[JsonRpc](jsonrpc.md)*

*Defined in [providers/ws.ts:23](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L23)*

___

###  options

• **options**: *any*

*Defined in [providers/ws.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L21)*

___

### `Protected` reqMiddleware

• **reqMiddleware**: *[ReqMiddleware](../README.md#reqmiddleware)* =  new Map().set('*', [])

*Inherited from [BaseProvider](baseprovider.md).[reqMiddleware](baseprovider.md#protected-reqmiddleware)*

*Defined in [providers/baseProvider.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseProvider.ts#L18)*

___

### `Protected` resMiddleware

• **resMiddleware**: *[ResMiddleware](../README.md#resmiddleware)* =  new Map().set('*', [])

*Inherited from [BaseProvider](baseprovider.md).[resMiddleware](baseprovider.md#protected-resmiddleware)*

*Defined in [providers/baseProvider.ts:19](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseProvider.ts#L19)*

___

###  subscriptions

• **subscriptions**: *any*

*Defined in [providers/ws.ts:20](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L20)*

___

###  url

• **url**: *string*

*Overrides [BaseSocket](basesocket.md).[url](basesocket.md#url)*

*Defined in [providers/ws.ts:19](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L19)*

## Accessors

###  connected

• **get connected**(): *boolean*

*Defined in [providers/ws.ts:15](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L15)*

**Returns:** *boolean*

## Methods

###  addEventListener

▸ **addEventListener**(`type`: string, `handler`: `mitt.Handler`): *void*

*Inherited from [BaseSocket](basesocket.md).[addEventListener](basesocket.md#addeventlistener)*

*Defined in [providers/baseSocket.ts:51](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

###  clearSubscriptions

▸ **clearSubscriptions**(`unsubscribeMethod`: string): *`Promise<boolean>`*

*Defined in [providers/ws.ts:166](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`unsubscribeMethod` | string |

**Returns:** *`Promise<boolean>`*

___

###  createWebsocketProvider

▸ **createWebsocketProvider**(`url`: string, `options`: any): *`w3cwebsocket` | `WebSocket`*

*Defined in [providers/ws.ts:63](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L63)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`options` | any |  {} |

**Returns:** *`w3cwebsocket` | `WebSocket`*

___

### `Protected` getMiddleware

▸ **getMiddleware**(`method`: [RPCMethod](../enums/rpcmethod.md) | string): *[[ReqMiddleware](../README.md#reqmiddleware)[], [ResMiddleware](../README.md#resmiddleware)[]]*

*Inherited from [BaseProvider](baseprovider.md).[getMiddleware](baseprovider.md#protected-getmiddleware)*

*Defined in [providers/baseProvider.ts:47](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseProvider.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | [RPCMethod](../enums/rpcmethod.md) \| string |

**Returns:** *[[ReqMiddleware](../README.md#reqmiddleware)[], [ResMiddleware](../README.md#resmiddleware)[]]*

___

###  getSubscriptionEvent

▸ **getSubscriptionEvent**(`subscriptionId`: any): *any*

*Defined in [providers/ws.ts:242](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionId` | any |

**Returns:** *any*

___

###  hasSubscription

▸ **hasSubscription**(`subscriptionId`: string): *boolean*

*Defined in [providers/ws.ts:256](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionId` | string |

**Returns:** *boolean*

___

###  isConnecting

▸ **isConnecting**(): *boolean*

*Defined in [providers/ws.ts:97](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L97)*

**Returns:** *boolean*

___

###  on

▸ **on**(`type`: string, `handler`: `mitt.Handler`): *`this`*

*Defined in [providers/ws.ts:40](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *`this`*

___

###  onClose

▸ **onClose**(`closeEvent`: any): *void*

*Overrides [BaseSocket](basesocket.md).[onClose](basesocket.md#onclose)*

*Defined in [providers/ws.ts:55](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`closeEvent` | any |

**Returns:** *void*

___

###  onConnect

▸ **onConnect**(): *`Promise<void>`*

*Defined in [providers/ws.ts:223](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L223)*

**Returns:** *`Promise<void>`*

___

###  onData

▸ **onData**(`handler`: any): *`this`*

*Defined in [providers/ws.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`handler` | any |

**Returns:** *`this`*

___

###  onError

▸ **onError**(`event`: any): *void*

*Overrides [BaseSocket](basesocket.md).[onError](basesocket.md#onerror)*

*Defined in [providers/ws.ts:48](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *void*

___

###  onMessage

▸ **onMessage**(`msg`: `MessageEvent`): *void*

*Defined in [providers/ws.ts:195](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L195)*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | `MessageEvent` |

**Returns:** *void*

___

###  onReady

▸ **onReady**(`event`: any): *void*

*Inherited from [BaseSocket](basesocket.md).[onReady](basesocket.md#onready)*

*Defined in [providers/baseSocket.ts:78](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *void*

___

###  once

▸ **once**(`type`: string, `handler`: `mitt.Handler`): *void*

*Inherited from [BaseSocket](basesocket.md).[once](basesocket.md#once)*

*Defined in [providers/baseSocket.ts:46](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

### `Protected` pushMiddleware

▸ **pushMiddleware**(`fn`: any, `type`: [MiddlewareType](../enums/middlewaretype.md), `match`: string | [RPCMethod](../enums/rpcmethod.md) | `RegExp`): *void*

*Inherited from [BaseProvider](baseprovider.md).[pushMiddleware](baseprovider.md#protected-pushmiddleware)*

*Defined in [providers/baseProvider.ts:31](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseProvider.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`fn` | any |
`type` | [MiddlewareType](../enums/middlewaretype.md) |
`match` | string \| [RPCMethod](../enums/rpcmethod.md) \| `RegExp` |

**Returns:** *void*

___

###  reconnect

▸ **reconnect**(): *void*

*Defined in [providers/ws.ts:90](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L90)*

**Returns:** *void*

___

###  registerEventListeners

▸ **registerEventListeners**(): *void*

*Defined in [providers/ws.ts:187](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L187)*

**Returns:** *void*

___

###  removeAllSocketListeners

▸ **removeAllSocketListeners**(): *void*

*Inherited from [BaseSocket](basesocket.md).[removeAllSocketListeners](basesocket.md#removeallsocketlisteners)*

*Defined in [providers/baseSocket.ts:70](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L70)*

**Returns:** *void*

___

###  removeEventListener

▸ **removeEventListener**(`type?`: undefined | string, `handler?`: `mitt.Handler`): *void*

*Inherited from [BaseSocket](basesocket.md).[removeEventListener](basesocket.md#removeeventlistener)*

*Defined in [providers/baseSocket.ts:55](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`type?` | undefined \| string |
`handler?` | `mitt.Handler` |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

*Inherited from [BaseSocket](basesocket.md).[reset](basesocket.md#reset)*

*Defined in [providers/baseSocket.ts:66](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L66)*

**Returns:** *void*

___

###  resetHandlers

▸ **resetHandlers**(): *void*

*Inherited from [BaseSocket](basesocket.md).[resetHandlers](basesocket.md#resethandlers)*

*Defined in [providers/baseSocket.ts:39](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L39)*

**Returns:** *void*

___

###  send

▸ **send**(`payload`: [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*object*›): *`Promise<any>`*

*Defined in [providers/ws.ts:101](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*object*› |

**Returns:** *`Promise<any>`*

___

###  subscribe

▸ **subscribe**(`payload`: [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any[]*›): *`Promise<any>`*

*Defined in [providers/ws.ts:131](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any[]*› |

**Returns:** *`Promise<any>`*

___

###  unsubscribe

▸ **unsubscribe**(`payload`: [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any[]*›): *`Promise<any>`*

*Defined in [providers/ws.ts:146](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any[]*› |

**Returns:** *`Promise<any>`*

___

###  validate

▸ **validate**(`response`: any, `payload?`: any): *true | `Error`*

*Defined in [providers/ws.ts:259](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L259)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | any |
`payload?` | any |

**Returns:** *true | `Error`*

## Object literals

###  middlewares

### ▪ **middlewares**: *object*

*Inherited from [BaseProvider](baseprovider.md).[middlewares](baseprovider.md#middlewares)*

*Defined in [providers/baseProvider.ts:5](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseProvider.ts#L5)*

▪ **request**: *object*

*Defined in [providers/baseProvider.ts:6](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseProvider.ts#L6)*

* **use**(`fn`: [ReqMiddleware](../README.md#reqmiddleware), `match`: string | [RPCMethod](../enums/rpcmethod.md) | `RegExp`): *void*

▪ **response**: *object*

*Defined in [providers/baseProvider.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseProvider.ts#L11)*

* **use**(`fn`: [ResMiddleware](../README.md#resmiddleware), `match`: string | [RPCMethod](../enums/rpcmethod.md) | `RegExp`): *void*