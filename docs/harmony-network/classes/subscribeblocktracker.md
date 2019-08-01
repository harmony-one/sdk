> **[@harmony-js/network](../README.md)**

[SubscribeBlockTracker](subscribeblocktracker.md) /

# Class: SubscribeBlockTracker

## Hierarchy

  * [BaseBlockTracker](baseblocktracker.md)

  * **SubscribeBlockTracker**

## Index

### Constructors

* [constructor](subscribeblocktracker.md#constructor)

### Properties

* [_blockResetDuration](subscribeblocktracker.md#optional-_blockresetduration)
* [_blockResetTimeout](subscribeblocktracker.md#_blockresettimeout)
* [_currentBlock](subscribeblocktracker.md#_currentblock)
* [_isRunning](subscribeblocktracker.md#_isrunning)
* [emit](subscribeblocktracker.md#emit)
* [emitter](subscribeblocktracker.md#emitter)
* [handlers](subscribeblocktracker.md#optional-handlers)
* [messenger](subscribeblocktracker.md#messenger)
* [off](subscribeblocktracker.md#off)
* [promise](subscribeblocktracker.md#promise)
* [reject](subscribeblocktracker.md#optional-reject)
* [resolve](subscribeblocktracker.md#optional-resolve)
* [subscriptionId](subscribeblocktracker.md#subscriptionid)
* [then](subscribeblocktracker.md#optional-then)

### Methods

* [_cancelBlockResetTimeout](subscribeblocktracker.md#_cancelblockresettimeout)
* [_end](subscribeblocktracker.md#_end)
* [_getBlockTrackerEventCount](subscribeblocktracker.md#_getblocktrackereventcount)
* [_handleSubData](subscribeblocktracker.md#_handlesubdata)
* [_maybeEnd](subscribeblocktracker.md#_maybeend)
* [_maybeStart](subscribeblocktracker.md#_maybestart)
* [_newPotentialLatest](subscribeblocktracker.md#_newpotentiallatest)
* [_onNewListener](subscribeblocktracker.md#_onnewlistener)
* [_onRemoveListener](subscribeblocktracker.md#_onremovelistener)
* [_resetCurrentBlock](subscribeblocktracker.md#_resetcurrentblock)
* [_setCurrentBlock](subscribeblocktracker.md#_setcurrentblock)
* [_setupBlockResetTimeout](subscribeblocktracker.md#_setupblockresettimeout)
* [_setupInternalEvents](subscribeblocktracker.md#_setupinternalevents)
* [_start](subscribeblocktracker.md#_start)
* [addEventListener](subscribeblocktracker.md#addeventlistener)
* [checkForLatestBlock](subscribeblocktracker.md#checkforlatestblock)
* [getCurrentBlock](subscribeblocktracker.md#getcurrentblock)
* [getLatestBlock](subscribeblocktracker.md#getlatestblock)
* [isRunning](subscribeblocktracker.md#isrunning)
* [listenerCount](subscribeblocktracker.md#listenercount)
* [on](subscribeblocktracker.md#on)
* [onData](subscribeblocktracker.md#ondata)
* [onError](subscribeblocktracker.md#onerror)
* [once](subscribeblocktracker.md#once)
* [removeAllListeners](subscribeblocktracker.md#removealllisteners)
* [removeEventListener](subscribeblocktracker.md#removeeventlistener)
* [resetHandlers](subscribeblocktracker.md#resethandlers)

## Constructors

###  constructor

\+ **new SubscribeBlockTracker**(`messenger`: [Messenger](messenger.md), `opts`: object): *[SubscribeBlockTracker](subscribeblocktracker.md)*

*Overrides [BaseBlockTracker](baseblocktracker.md).[constructor](baseblocktracker.md#constructor)*

*Defined in [tracker/subscribeTracker.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/subscribeTracker.ts#L8)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`messenger` | [Messenger](messenger.md) | - |
`opts` | object |  {} |

**Returns:** *[SubscribeBlockTracker](subscribeblocktracker.md)*

## Properties

### `Optional` _blockResetDuration

• **_blockResetDuration**? : *undefined | number*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_blockResetDuration](baseblocktracker.md#optional-_blockresetduration)*

*Defined in [tracker/baseTracker.ts:12](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L12)*

___

###  _blockResetTimeout

• **_blockResetTimeout**: *any*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_blockResetTimeout](baseblocktracker.md#_blockresettimeout)*

*Defined in [tracker/baseTracker.ts:14](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L14)*

___

###  _currentBlock

• **_currentBlock**: *any*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_currentBlock](baseblocktracker.md#_currentblock)*

*Defined in [tracker/baseTracker.ts:16](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L16)*

___

###  _isRunning

• **_isRunning**: *boolean*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_isRunning](baseblocktracker.md#_isrunning)*

*Defined in [tracker/baseTracker.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L18)*

___

###  emit

• **emit**: *function*

*Inherited from [Emitter](emitter.md).[emit](emitter.md#emit)*

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

*Inherited from [Emitter](emitter.md).[emitter](emitter.md#emitter)*

*Defined in [providers/emitter.ts:5](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L5)*

___

### `Optional` handlers

• **handlers**? : *any*

*Inherited from [Emitter](emitter.md).[handlers](emitter.md#optional-handlers)*

*Defined in [providers/emitter.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L4)*

___

###  messenger

• **messenger**: *[Messenger](messenger.md)*

*Defined in [tracker/subscribeTracker.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/subscribeTracker.ts#L7)*

___

###  off

• **off**: *function*

*Inherited from [Emitter](emitter.md).[off](emitter.md#off)*

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

*Inherited from [Emitter](emitter.md).[promise](emitter.md#promise)*

*Defined in [providers/emitter.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L8)*

___

### `Optional` reject

• **reject**? : *any*

*Inherited from [Emitter](emitter.md).[reject](emitter.md#optional-reject)*

*Defined in [providers/emitter.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L10)*

___

### `Optional` resolve

• **resolve**? : *any*

*Inherited from [Emitter](emitter.md).[resolve](emitter.md#optional-resolve)*

*Defined in [providers/emitter.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L9)*

___

###  subscriptionId

• **subscriptionId**: *any*

*Defined in [tracker/subscribeTracker.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/subscribeTracker.ts#L8)*

___

### `Optional` then

• **then**? : *any*

*Inherited from [Emitter](emitter.md).[then](emitter.md#optional-then)*

*Defined in [providers/emitter.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L11)*

## Methods

###  _cancelBlockResetTimeout

▸ **_cancelBlockResetTimeout**(): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_cancelBlockResetTimeout](baseblocktracker.md#_cancelblockresettimeout)*

*Defined in [tracker/baseTracker.ts:182](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L182)*

**Returns:** *void*

___

###  _end

▸ **_end**(): *`Promise<void>`*

*Overrides [BaseBlockTracker](baseblocktracker.md).[_end](baseblocktracker.md#_end)*

*Defined in [tracker/subscribeTracker.ts:51](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/subscribeTracker.ts#L51)*

**Returns:** *`Promise<void>`*

___

###  _getBlockTrackerEventCount

▸ **_getBlockTrackerEventCount**(): *number*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_getBlockTrackerEventCount](baseblocktracker.md#_getblocktrackereventcount)*

*Defined in [tracker/baseTracker.ts:141](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L141)*

**Returns:** *number*

___

###  _handleSubData

▸ **_handleSubData**(`data`: any): *void*

*Defined in [tracker/subscribeTracker.ts:58](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/subscribeTracker.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  _maybeEnd

▸ **_maybeEnd**(): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_maybeEnd](baseblocktracker.md#_maybeend)*

*Defined in [tracker/baseTracker.ts:132](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L132)*

**Returns:** *void*

___

###  _maybeStart

▸ **_maybeStart**(): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_maybeStart](baseblocktracker.md#_maybestart)*

*Defined in [tracker/baseTracker.ts:122](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L122)*

**Returns:** *void*

___

###  _newPotentialLatest

▸ **_newPotentialLatest**(`newBlock`: string): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_newPotentialLatest](baseblocktracker.md#_newpotentiallatest)*

*Defined in [tracker/baseTracker.ts:147](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`newBlock` | string |

**Returns:** *void*

___

###  _onNewListener

▸ **_onNewListener**(`eventName`: string, `handler?`: `mitt.Handler`): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_onNewListener](baseblocktracker.md#_onnewlistener)*

*Defined in [tracker/baseTracker.ts:105](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`handler?` | `mitt.Handler` |

**Returns:** *void*

___

###  _onRemoveListener

▸ **_onRemoveListener**(`eventName`: string, `handler?`: `mitt.Handler`): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_onRemoveListener](baseblocktracker.md#_onremovelistener)*

*Defined in [tracker/baseTracker.ts:114](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`handler?` | `mitt.Handler` |

**Returns:** *void*

___

###  _resetCurrentBlock

▸ **_resetCurrentBlock**(): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_resetCurrentBlock](baseblocktracker.md#_resetcurrentblock)*

*Defined in [tracker/baseTracker.ts:186](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L186)*

**Returns:** *void*

___

###  _setCurrentBlock

▸ **_setCurrentBlock**(`newBlock`: string): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_setCurrentBlock](baseblocktracker.md#_setcurrentblock)*

*Defined in [tracker/baseTracker.ts:161](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L161)*

**Parameters:**

Name | Type |
------ | ------ |
`newBlock` | string |

**Returns:** *void*

___

###  _setupBlockResetTimeout

▸ **_setupBlockResetTimeout**(): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_setupBlockResetTimeout](baseblocktracker.md#_setupblockresettimeout)*

*Defined in [tracker/baseTracker.ts:168](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L168)*

**Returns:** *void*

___

###  _setupInternalEvents

▸ **_setupInternalEvents**(): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_setupInternalEvents](baseblocktracker.md#_setupinternalevents)*

*Defined in [tracker/baseTracker.ts:95](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L95)*

**Returns:** *void*

___

###  _start

▸ **_start**(): *`Promise<void>`*

*Overrides [BaseBlockTracker](baseblocktracker.md).[_start](baseblocktracker.md#_start)*

*Defined in [tracker/subscribeTracker.ts:31](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/subscribeTracker.ts#L31)*

**Returns:** *`Promise<void>`*

___

###  addEventListener

▸ **addEventListener**(`type`: string, `handler`: `mitt.Handler`): *void*

*Inherited from [Emitter](emitter.md).[addEventListener](emitter.md#addeventlistener)*

*Defined in [providers/emitter.ts:41](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

###  checkForLatestBlock

▸ **checkForLatestBlock**(): *`Promise<any>`*

*Defined in [tracker/subscribeTracker.ts:26](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/subscribeTracker.ts#L26)*

**Returns:** *`Promise<any>`*

___

###  getCurrentBlock

▸ **getCurrentBlock**(): *any*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[getCurrentBlock](baseblocktracker.md#getcurrentblock)*

*Defined in [tracker/baseTracker.ts:48](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L48)*

**Returns:** *any*

___

###  getLatestBlock

▸ **getLatestBlock**(): *`Promise<any>`*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[getLatestBlock](baseblocktracker.md#getlatestblock)*

*Defined in [tracker/baseTracker.ts:52](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L52)*

**Returns:** *`Promise<any>`*

___

###  isRunning

▸ **isRunning**(): *boolean*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[isRunning](baseblocktracker.md#isrunning)*

*Defined in [tracker/baseTracker.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L44)*

**Returns:** *boolean*

___

###  listenerCount

▸ **listenerCount**(`listenKey`: any): *number*

*Inherited from [Emitter](emitter.md).[listenerCount](emitter.md#listenercount)*

*Defined in [providers/emitter.ts:64](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`listenKey` | any |

**Returns:** *number*

___

###  on

▸ **on**(`type`: string, `handler`: `mitt.Handler`): *`this`*

*Inherited from [Emitter](emitter.md).[on](emitter.md#on)*

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

*Inherited from [Emitter](emitter.md).[onData](emitter.md#ondata)*

*Defined in [providers/emitter.ts:60](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  onError

▸ **onError**(`error`: any): *void*

*Inherited from [Emitter](emitter.md).[onError](emitter.md#onerror)*

*Defined in [providers/emitter.ts:56](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | any |

**Returns:** *void*

___

###  once

▸ **once**(`type`: string, `handler`: `mitt.Handler`): *void*

*Inherited from [Emitter](emitter.md).[once](emitter.md#once)*

*Defined in [providers/emitter.ts:34](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`handler` | `mitt.Handler` |

**Returns:** *void*

___

###  removeAllListeners

▸ **removeAllListeners**(`eventName`: string): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[removeAllListeners](baseblocktracker.md#removealllisteners)*

*Defined in [tracker/baseTracker.ts:66](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |

**Returns:** *void*

___

###  removeEventListener

▸ **removeEventListener**(`type?`: undefined | string, `handler?`: `mitt.Handler`): *void*

*Inherited from [Emitter](emitter.md).[removeEventListener](emitter.md#removeeventlistener)*

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

*Inherited from [Emitter](emitter.md).[resetHandlers](emitter.md#resethandlers)*

*Defined in [providers/emitter.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L24)*

**Returns:** *void*