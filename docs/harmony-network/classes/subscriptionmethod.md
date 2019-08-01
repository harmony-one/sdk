> **[@harmony-js/network](../README.md)**

[SubscriptionMethod](subscriptionmethod.md) /

# Class: SubscriptionMethod

## Hierarchy

  * [WSProvider](wsprovider.md)

  * **SubscriptionMethod**

  * [LogSub](logsub.md)

  * [NewHeaders](newheaders.md)

  * [NewPendingTransactions](newpendingtransactions.md)

  * [Syncing](syncing.md)

## Index

### Constructors

* [constructor](subscriptionmethod.md#constructor)

### Properties

* [connection](subscriptionmethod.md#connection)
* [emitter](subscriptionmethod.md#emitter)
* [handlers](subscriptionmethod.md#handlers)
* [jsonRpc](subscriptionmethod.md#jsonrpc)
* [messenger](subscriptionmethod.md#messenger)
* [options](subscriptionmethod.md#options)
* [param](subscriptionmethod.md#param)
* [reqMiddleware](subscriptionmethod.md#protected-reqmiddleware)
* [resMiddleware](subscriptionmethod.md#protected-resmiddleware)
* [subscriptionId](subscriptionmethod.md#subscriptionid)
* [subscriptions](subscriptionmethod.md#subscriptions)
* [url](subscriptionmethod.md#url)

### Accessors

* [connected](subscriptionmethod.md#connected)

### Methods

* [addEventListener](subscriptionmethod.md#addeventlistener)
* [clearSubscriptions](subscriptionmethod.md#clearsubscriptions)
* [constructPayload](subscriptionmethod.md#constructpayload)
* [createWebsocketProvider](subscriptionmethod.md#createwebsocketprovider)
* [getMiddleware](subscriptionmethod.md#protected-getmiddleware)
* [getSubscriptionEvent](subscriptionmethod.md#getsubscriptionevent)
* [hasSubscription](subscriptionmethod.md#hassubscription)
* [isConnecting](subscriptionmethod.md#isconnecting)
* [on](subscriptionmethod.md#on)
* [onClose](subscriptionmethod.md#onclose)
* [onConnect](subscriptionmethod.md#onconnect)
* [onData](subscriptionmethod.md#ondata)
* [onError](subscriptionmethod.md#onerror)
* [onMessage](subscriptionmethod.md#onmessage)
* [onNewSubscriptionItem](subscriptionmethod.md#onnewsubscriptionitem)
* [onReady](subscriptionmethod.md#onready)
* [once](subscriptionmethod.md#once)
* [pushMiddleware](subscriptionmethod.md#protected-pushmiddleware)
* [reconnect](subscriptionmethod.md#reconnect)
* [registerEventListeners](subscriptionmethod.md#registereventlisteners)
* [removeAllSocketListeners](subscriptionmethod.md#removeallsocketlisteners)
* [removeEventListener](subscriptionmethod.md#removeeventlistener)
* [reset](subscriptionmethod.md#reset)
* [resetHandlers](subscriptionmethod.md#resethandlers)
* [send](subscriptionmethod.md#send)
* [start](subscriptionmethod.md#start)
* [subscribe](subscriptionmethod.md#subscribe)
* [unsubscribe](subscriptionmethod.md#unsubscribe)
* [validate](subscriptionmethod.md#validate)

### Object literals

* [middlewares](subscriptionmethod.md#middlewares)

## Constructors

###  constructor

\+ **new SubscriptionMethod**(`param`: any, `options`: any, `messenger`: [Messenger](messenger.md)): *[SubscriptionMethod](subscriptionmethod.md)*

*Overrides [WSProvider](wsprovider.md).[constructor](wsprovider.md#constructor)*

*Defined in [subscriptions/Subscription.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`param` | any |
`options` | any |
`messenger` | [Messenger](messenger.md) |

**Returns:** *[SubscriptionMethod](subscriptionmethod.md)*

## Properties

###  connection

• **connection**: *`W3CWebsocket` | `WebSocket`*

*Inherited from [WSProvider](wsprovider.md).[connection](wsprovider.md#connection)*

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

*Inherited from [WSProvider](wsprovider.md).[jsonRpc](wsprovider.md#jsonrpc)*

*Defined in [providers/ws.ts:23](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L23)*

___

###  messenger

• **messenger**: *[Messenger](messenger.md)*

*Defined in [subscriptions/Subscription.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L9)*

___

###  options

• **options**: *any*

*Overrides [WSProvider](wsprovider.md).[options](wsprovider.md#options)*

*Defined in [subscriptions/Subscription.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L8)*

___

###  param

• **param**: *any*

*Defined in [subscriptions/Subscription.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L7)*

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

###  subscriptionId

• **subscriptionId**: *any* =  null

*Defined in [subscriptions/Subscription.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L11)*

___

###  subscriptions

• **subscriptions**: *any*

*Inherited from [WSProvider](wsprovider.md).[subscriptions](wsprovider.md#subscriptions)*

*Defined in [providers/ws.ts:20](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L20)*

___

###  url

• **url**: *string*

*Inherited from [WSProvider](wsprovider.md).[url](wsprovider.md#url)*

*Overrides [BaseSocket](basesocket.md).[url](basesocket.md#url)*

*Defined in [providers/ws.ts:19](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L19)*

## Accessors

###  connected

• **get connected**(): *boolean*

*Inherited from [WSProvider](wsprovider.md).[connected](wsprovider.md#connected)*

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

*Inherited from [WSProvider](wsprovider.md).[clearSubscriptions](wsprovider.md#clearsubscriptions)*

*Defined in [providers/ws.ts:166](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`unsubscribeMethod` | string |

**Returns:** *`Promise<boolean>`*

___

###  constructPayload

▸ **constructPayload**(`method`: string, `param`: any, `options?`: any): *[RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any*›*

*Defined in [subscriptions/Subscription.ts:19](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`param` | any |
`options?` | any |

**Returns:** *[RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any*›*

___

###  createWebsocketProvider

▸ **createWebsocketProvider**(`url`: string, `options`: any): *`w3cwebsocket` | `WebSocket`*

*Inherited from [WSProvider](wsprovider.md).[createWebsocketProvider](wsprovider.md#createwebsocketprovider)*

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

*Inherited from [WSProvider](wsprovider.md).[getSubscriptionEvent](wsprovider.md#getsubscriptionevent)*

*Defined in [providers/ws.ts:242](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionId` | any |

**Returns:** *any*

___

###  hasSubscription

▸ **hasSubscription**(`subscriptionId`: string): *boolean*

*Inherited from [WSProvider](wsprovider.md).[hasSubscription](wsprovider.md#hassubscription)*

*Defined in [providers/ws.ts:256](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionId` | string |

**Returns:** *boolean*

___

###  isConnecting

▸ **isConnecting**(): *boolean*

*Inherited from [WSProvider](wsprovider.md).[isConnecting](wsprovider.md#isconnecting)*

*Defined in [providers/ws.ts:97](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L97)*

**Returns:** *boolean*

___

###  on

▸ **on**(`type`: string, `handler`: `mitt.Handler`): *`this`*

*Inherited from [WSProvider](wsprovider.md).[on](wsprovider.md#on)*

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

*Inherited from [WSProvider](wsprovider.md).[onClose](wsprovider.md#onclose)*

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

*Inherited from [WSProvider](wsprovider.md).[onConnect](wsprovider.md#onconnect)*

*Defined in [providers/ws.ts:223](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L223)*

**Returns:** *`Promise<void>`*

___

###  onData

▸ **onData**(`handler`: any): *`this`*

*Inherited from [WSProvider](wsprovider.md).[onData](wsprovider.md#ondata)*

*Defined in [providers/ws.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`handler` | any |

**Returns:** *`this`*

___

###  onError

▸ **onError**(`event`: any): *void*

*Inherited from [WSProvider](wsprovider.md).[onError](wsprovider.md#onerror)*

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

*Inherited from [WSProvider](wsprovider.md).[onMessage](wsprovider.md#onmessage)*

*Defined in [providers/ws.ts:195](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L195)*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | `MessageEvent` |

**Returns:** *void*

___

###  onNewSubscriptionItem

▸ **onNewSubscriptionItem**(`subscriptionItem`: any): *any*

*Defined in [subscriptions/Subscription.ts:66](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionItem` | any |

**Returns:** *any*

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

*Inherited from [WSProvider](wsprovider.md).[reconnect](wsprovider.md#reconnect)*

*Defined in [providers/ws.ts:90](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L90)*

**Returns:** *void*

___

###  registerEventListeners

▸ **registerEventListeners**(): *void*

*Inherited from [WSProvider](wsprovider.md).[registerEventListeners](wsprovider.md#registereventlisteners)*

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

*Inherited from [WSProvider](wsprovider.md).[send](wsprovider.md#send)*

*Defined in [providers/ws.ts:101](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*object*› |

**Returns:** *`Promise<any>`*

___

###  start

▸ **start**(): *`Promise<this>`*

*Defined in [subscriptions/Subscription.ts:34](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L34)*

**Returns:** *`Promise<this>`*

___

###  subscribe

▸ **subscribe**(`payload`: [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any[]*›): *`Promise<any>`*

*Inherited from [WSProvider](wsprovider.md).[subscribe](wsprovider.md#subscribe)*

*Defined in [providers/ws.ts:131](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/ws.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | [RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any[]*› |

**Returns:** *`Promise<any>`*

___

###  unsubscribe

▸ **unsubscribe**(): *`Promise<any>`*

*Overrides [WSProvider](wsprovider.md).[unsubscribe](wsprovider.md#unsubscribe)*

*Defined in [subscriptions/Subscription.ts:59](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/subscriptions/Subscription.ts#L59)*

**Returns:** *`Promise<any>`*

___

###  validate

▸ **validate**(`response`: any, `payload?`: any): *true | `Error`*

*Inherited from [WSProvider](wsprovider.md).[validate](wsprovider.md#validate)*

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