> **[@harmony-js/contract](../README.md)**

[EventMethod](eventmethod.md) /

# Class: EventMethod

## Hierarchy

* `LogSub`

  * **EventMethod**

## Index

### Constructors

* [constructor](eventmethod.md#constructor)

### Properties

* [abiItem](eventmethod.md#abiitem)
* [connected](eventmethod.md#connected)
* [connection](eventmethod.md#connection)
* [contract](eventmethod.md#contract)
* [emitter](eventmethod.md#emitter)
* [handlers](eventmethod.md#handlers)
* [jsonRpc](eventmethod.md#jsonrpc)
* [messenger](eventmethod.md#messenger)
* [methodKey](eventmethod.md#methodkey)
* [middlewares](eventmethod.md#middlewares)
* [options](eventmethod.md#options)
* [param](eventmethod.md#param)
* [params](eventmethod.md#params)
* [reqMiddleware](eventmethod.md#protected-reqmiddleware)
* [resMiddleware](eventmethod.md#protected-resmiddleware)
* [subscriptionId](eventmethod.md#subscriptionid)
* [subscriptions](eventmethod.md#subscriptions)
* [url](eventmethod.md#url)

### Methods

* [addEventListener](eventmethod.md#addeventlistener)
* [clearSubscriptions](eventmethod.md#clearsubscriptions)
* [constructPayload](eventmethod.md#constructpayload)
* [createWebsocketProvider](eventmethod.md#createwebsocketprovider)
* [getMiddleware](eventmethod.md#protected-getmiddleware)
* [getSubscriptionEvent](eventmethod.md#getsubscriptionevent)
* [hasSubscription](eventmethod.md#hassubscription)
* [isConnecting](eventmethod.md#isconnecting)
* [on](eventmethod.md#on)
* [onClose](eventmethod.md#onclose)
* [onConnect](eventmethod.md#onconnect)
* [onData](eventmethod.md#ondata)
* [onError](eventmethod.md#onerror)
* [onMessage](eventmethod.md#onmessage)
* [onNewSubscriptionItem](eventmethod.md#onnewsubscriptionitem)
* [onReady](eventmethod.md#onready)
* [once](eventmethod.md#once)
* [pushMiddleware](eventmethod.md#protected-pushmiddleware)
* [reconnect](eventmethod.md#reconnect)
* [registerEventListeners](eventmethod.md#registereventlisteners)
* [removeAllSocketListeners](eventmethod.md#removeallsocketlisteners)
* [removeEventListener](eventmethod.md#removeeventlistener)
* [reset](eventmethod.md#reset)
* [resetHandlers](eventmethod.md#resethandlers)
* [send](eventmethod.md#send)
* [start](eventmethod.md#start)
* [subscribe](eventmethod.md#subscribe)
* [unsubscribe](eventmethod.md#unsubscribe)
* [validate](eventmethod.md#validate)

## Constructors

###  constructor

\+ **new EventMethod**(`methodKey`: string, `params`: any, `abiItem`: [AbiItemModel](../interfaces/abiitemmodel.md), `contract`: [Contract](contract.md)): *[EventMethod](eventmethod.md)*

*Overrides void*

*Defined in [events/event.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/event.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`methodKey` | string |
`params` | any |
`abiItem` | [AbiItemModel](../interfaces/abiitemmodel.md) |
`contract` | [Contract](contract.md) |

**Returns:** *[EventMethod](eventmethod.md)*

## Properties

###  abiItem

• **abiItem**: *[AbiItemModel](../interfaces/abiitemmodel.md)*

*Defined in [events/event.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/event.ts#L10)*

___

###  connected

• **connected**: *boolean*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:6

___

###  connection

• **connection**: *`W3CWebsocket` | `WebSocket`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:10

___

###  contract

• **contract**: *[Contract](contract.md)*

*Defined in [events/event.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/event.ts#L9)*

___

###  emitter

• **emitter**: *`Emitter`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:24

___

###  handlers

• **handlers**: *any*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:25

___

###  jsonRpc

• **jsonRpc**: *`JsonRpc`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:11

___

###  messenger

• **messenger**: *`Messenger`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/Subscription.d.ts:7

___

###  methodKey

• **methodKey**: *string*

*Defined in [events/event.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/event.ts#L8)*

___

###  middlewares

• **middlewares**: *object*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseProvider.d.ts:4

#### Type declaration:

* **request**(): *object*

  * **use**(): *function*

    * (`fn`: `Map<string | RegExp, any[]>`, `match?`: string | `RegExp`): *void*

* **response**(): *object*

  * **use**(): *function*

    * (`fn`: `Map<string | RegExp, any[]>`, `match?`: string | `RegExp`): *void*

___

###  options

• **options**: *any*

*Inherited from void*

*Overrides void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/Subscription.d.ts:6

___

###  param

• **param**: *any*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/Subscription.d.ts:5

___

###  params

• **params**: *any*

*Defined in [events/event.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/event.ts#L7)*

___

### `Protected` reqMiddleware

• **reqMiddleware**: *`ReqMiddleware`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseProvider.d.ts:13

___

### `Protected` resMiddleware

• **resMiddleware**: *`ResMiddleware`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseProvider.d.ts:14

___

###  subscriptionId

• **subscriptionId**: *any*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/Subscription.d.ts:8

___

###  subscriptions

• **subscriptions**: *any*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:8

___

###  url

• **url**: *string*

*Inherited from void*

*Overrides void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:7

## Methods

###  addEventListener

▸ **addEventListener**(`type`: string, `handler`: `mitt.Handler`): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

###  clearSubscriptions

▸ **clearSubscriptions**(`unsubscribeMethod`: string): *`Promise<boolean>`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`unsubscribeMethod` | string |

**Returns:** *`Promise<boolean>`*

___

###  constructPayload

▸ **constructPayload**(`method`: string, `param`: any, `options?`: any): *`RPCRequestPayload<any>`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/Subscription.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`param` | any |
`options?` | any |

**Returns:** *`RPCRequestPayload<any>`*

___

###  createWebsocketProvider

▸ **createWebsocketProvider**(`url`: string, `options?`: any): *`W3CWebsocket` | `WebSocket`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`options?` | any |

**Returns:** *`W3CWebsocket` | `WebSocket`*

___

### `Protected` getMiddleware

▸ **getMiddleware**(`method`: `RPCMethod` | string): *[`ReqMiddleware`[], `ResMiddleware`[]]*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseProvider.d.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`method` | `RPCMethod` \| string |

**Returns:** *[`ReqMiddleware`[], `ResMiddleware`[]]*

___

###  getSubscriptionEvent

▸ **getSubscriptionEvent**(`subscriptionId`: any): *any*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionId` | any |

**Returns:** *any*

___

###  hasSubscription

▸ **hasSubscription**(`subscriptionId`: string): *boolean*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionId` | string |

**Returns:** *boolean*

___

###  isConnecting

▸ **isConnecting**(): *boolean*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:19

**Returns:** *boolean*

___

###  on

▸ **on**(`type`: string, `handler`: `mitt.Handler`): *this*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *this*

___

###  onClose

▸ **onClose**(`closeEvent`: any): *void*

*Inherited from void*

*Overrides void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:16

**Parameters:**

Name | Type |
------ | ------ |
`closeEvent` | any |

**Returns:** *void*

___

###  onConnect

▸ **onConnect**(): *`Promise<void>`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:26

**Returns:** *`Promise<void>`*

___

###  onData

▸ **onData**(`handler`: any): *this*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`handler` | any |

**Returns:** *this*

___

###  onError

▸ **onError**(`event`: any): *void*

*Inherited from void*

*Overrides void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *void*

___

###  onMessage

▸ **onMessage**(`msg`: `MessageEvent`): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`msg` | `MessageEvent` |

**Returns:** *void*

___

###  onNewSubscriptionItem

▸ **onNewSubscriptionItem**(`subscriptionItem`: any): *any*

*Overrides void*

*Defined in [events/event.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/event.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`subscriptionItem` | any |

**Returns:** *any*

___

###  onReady

▸ **onReady**(`event`: any): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *void*

___

###  once

▸ **once**(`type`: string, `handler`: `mitt.Handler`): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

### `Protected` pushMiddleware

▸ **pushMiddleware**(`fn`: any, `type`: `MiddlewareType`, `match`: string | `RPCMethod` | `RegExp`): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseProvider.d.ts:16

**Parameters:**

Name | Type |
------ | ------ |
`fn` | any |
`type` | `MiddlewareType` |
`match` | string \| `RPCMethod` \| `RegExp` |

**Returns:** *void*

___

###  reconnect

▸ **reconnect**(): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:18

**Returns:** *void*

___

###  registerEventListeners

▸ **registerEventListeners**(): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:24

**Returns:** *void*

___

###  removeAllSocketListeners

▸ **removeAllSocketListeners**(): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:32

**Returns:** *void*

___

###  removeEventListener

▸ **removeEventListener**(`type?`: undefined | string, `handler?`: `mitt.Handler`): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`type?` | undefined \| string |
`handler?` | `mitt.Handler` |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:31

**Returns:** *void*

___

###  resetHandlers

▸ **resetHandlers**(): *void*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/baseSocket.d.ts:27

**Returns:** *void*

___

###  send

▸ **send**(`payload`: `RPCRequestPayload<object>`): *`Promise<any>`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`payload` | `RPCRequestPayload<object>` |

**Returns:** *`Promise<any>`*

___

###  start

▸ **start**(): *`Promise<this>`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/Subscription.d.ts:11

**Returns:** *`Promise<this>`*

___

###  subscribe

▸ **subscribe**(): *`Promise<this>`*

*Inherited from void*

*Overrides void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/LogSub.d.ts:5

**Returns:** *`Promise<this>`*

___

###  unsubscribe

▸ **unsubscribe**(): *`Promise<any>`*

*Inherited from void*

*Overrides void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/subscriptions/Subscription.d.ts:12

**Returns:** *`Promise<any>`*

___

###  validate

▸ **validate**(`response`: any, `payload?`: any): *true | `Error`*

*Inherited from void*

Defined in /Users/suwei/dev/harmony-js/packages/harmony-network/dist/providers/ws.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`response` | any |
`payload?` | any |

**Returns:** *true | `Error`*