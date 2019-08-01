> **[@harmony-js/network](../README.md)**

[BaseSocket](basesocket.md) /

# Class: BaseSocket

## Hierarchy

* [BaseProvider](baseprovider.md)

  * **BaseSocket**

  * [WSProvider](wsprovider.md)

## Index

### Constructors

* [constructor](basesocket.md#constructor)

### Properties

* [emitter](basesocket.md#emitter)
* [handlers](basesocket.md#handlers)
* [reqMiddleware](basesocket.md#protected-reqmiddleware)
* [resMiddleware](basesocket.md#protected-resmiddleware)
* [url](basesocket.md#url)

### Methods

* [addEventListener](basesocket.md#addeventlistener)
* [getMiddleware](basesocket.md#protected-getmiddleware)
* [onClose](basesocket.md#onclose)
* [onError](basesocket.md#onerror)
* [onReady](basesocket.md#onready)
* [once](basesocket.md#once)
* [pushMiddleware](basesocket.md#protected-pushmiddleware)
* [removeAllSocketListeners](basesocket.md#removeallsocketlisteners)
* [removeEventListener](basesocket.md#removeeventlistener)
* [reset](basesocket.md#reset)
* [resetHandlers](basesocket.md#resethandlers)

### Object literals

* [middlewares](basesocket.md#middlewares)

## Constructors

###  constructor

\+ **new BaseSocket**(`url`: string): *[BaseSocket](basesocket.md)*

*Overrides [BaseProvider](baseprovider.md).[constructor](baseprovider.md#constructor)*

*Defined in [providers/baseSocket.ts:30](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *[BaseSocket](basesocket.md)*

## Properties

###  emitter

• **emitter**: *`Emitter`*

*Defined in [providers/baseSocket.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L29)*

___

###  handlers

• **handlers**: *any*

*Defined in [providers/baseSocket.ts:30](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L30)*

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

###  url

• **url**: *string*

*Overrides [BaseProvider](baseprovider.md).[url](baseprovider.md#protected-url)*

*Defined in [providers/baseSocket.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L28)*

## Methods

###  addEventListener

▸ **addEventListener**(`type`: string, `handler`: `mitt.Handler`): *void*

*Defined in [providers/baseSocket.ts:51](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

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

###  onClose

▸ **onClose**(`error`: null): *void*

*Defined in [providers/baseSocket.ts:88](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L88)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`error` | null |  null |

**Returns:** *void*

___

###  onError

▸ **onError**(`error`: any): *void*

*Defined in [providers/baseSocket.ts:82](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *void*

___

###  onReady

▸ **onReady**(`event`: any): *void*

*Defined in [providers/baseSocket.ts:78](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | any |

**Returns:** *void*

___

###  once

▸ **once**(`type`: string, `handler`: `mitt.Handler`): *void*

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

###  removeAllSocketListeners

▸ **removeAllSocketListeners**(): *void*

*Defined in [providers/baseSocket.ts:70](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L70)*

**Returns:** *void*

___

###  removeEventListener

▸ **removeEventListener**(`type?`: undefined | string, `handler?`: `mitt.Handler`): *void*

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

*Defined in [providers/baseSocket.ts:66](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L66)*

**Returns:** *void*

___

###  resetHandlers

▸ **resetHandlers**(): *void*

*Defined in [providers/baseSocket.ts:39](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/baseSocket.ts#L39)*

**Returns:** *void*

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