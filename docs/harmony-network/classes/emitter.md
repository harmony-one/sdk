> **[@harmony-js/network](../README.md)**

[Emitter](emitter.md) /

# Class: Emitter

## Hierarchy

* **Emitter**

  * [BaseBlockTracker](baseblocktracker.md)

## Index

### Constructors

* [constructor](emitter.md#constructor)

### Properties

* [emit](emitter.md#emit)
* [emitter](emitter.md#emitter)
* [handlers](emitter.md#optional-handlers)
* [off](emitter.md#off)
* [promise](emitter.md#promise)
* [reject](emitter.md#optional-reject)
* [resolve](emitter.md#optional-resolve)
* [then](emitter.md#optional-then)

### Methods

* [addEventListener](emitter.md#addeventlistener)
* [listenerCount](emitter.md#listenercount)
* [on](emitter.md#on)
* [onData](emitter.md#ondata)
* [onError](emitter.md#onerror)
* [once](emitter.md#once)
* [removeEventListener](emitter.md#removeeventlistener)
* [resetHandlers](emitter.md#resethandlers)

## Constructors

###  constructor

\+ **new Emitter**(): *[Emitter](emitter.md)*

*Defined in [providers/emitter.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L11)*

**Returns:** *[Emitter](emitter.md)*

## Properties

###  emit

• **emit**: *function*

*Defined in [providers/emitter.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L7)*

#### Type declaration:

▸ (`type`: string, `event?`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`event?` | any |

___

###  emitter

• **emitter**: *`Emitter`*

*Defined in [providers/emitter.ts:5](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L5)*

___

### `Optional` handlers

• **handlers**? : *any*

*Defined in [providers/emitter.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L4)*

___

###  off

• **off**: *function*

*Defined in [providers/emitter.ts:6](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L6)*

#### Type declaration:

▸ (`type`: string, `handler`: `mitt.Handler`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

___

###  promise

• **promise**: *`Promise<__type>`*

*Defined in [providers/emitter.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L8)*

___

### `Optional` reject

• **reject**? : *any*

*Defined in [providers/emitter.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L10)*

___

### `Optional` resolve

• **resolve**? : *any*

*Defined in [providers/emitter.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L9)*

___

### `Optional` then

• **then**? : *any*

*Defined in [providers/emitter.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L11)*

## Methods

###  addEventListener

▸ **addEventListener**(`type`: string, `handler`: `mitt.Handler`): *void*

*Defined in [providers/emitter.ts:41](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`listenKey`: any): *number*

*Defined in [providers/emitter.ts:64](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`listenKey` | any |

**Returns:** *number*

___

###  on

▸ **on**(`type`: string, `handler`: `mitt.Handler`): *`this`*

*Defined in [providers/emitter.ts:30](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *`this`*

___

###  onData

▸ **onData**(`data`: any): *void*

*Defined in [providers/emitter.ts:60](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  onError

▸ **onError**(`error`: any): *void*

*Defined in [providers/emitter.ts:56](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *void*

___

###  once

▸ **once**(`type`: string, `handler`: `mitt.Handler`): *void*

*Defined in [providers/emitter.ts:34](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

###  removeEventListener

▸ **removeEventListener**(`type?`: undefined | string, `handler?`: `mitt.Handler`): *void*

*Defined in [providers/emitter.ts:45](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`type?` | undefined \| string |
`handler?` | `mitt.Handler` |

**Returns:** *void*

___

###  resetHandlers

▸ **resetHandlers**(): *void*

*Defined in [providers/emitter.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L24)*

**Returns:** *void*