> **[@harmony-js/network](../README.md)**

[BaseBlockTracker](baseblocktracker.md) /

# Class: BaseBlockTracker

## Hierarchy

* [Emitter](emitter.md)

  * **BaseBlockTracker**

  * [PollingBlockTracker](pollingblocktracker.md)

  * [SubscribeBlockTracker](subscribeblocktracker.md)

## Index

### Constructors

* [constructor](baseblocktracker.md#constructor)

### Properties

* [_blockResetDuration](baseblocktracker.md#optional-_blockresetduration)
* [_blockResetTimeout](baseblocktracker.md#_blockresettimeout)
* [_currentBlock](baseblocktracker.md#_currentblock)
* [_isRunning](baseblocktracker.md#_isrunning)
* [emit](baseblocktracker.md#emit)
* [emitter](baseblocktracker.md#emitter)
* [handlers](baseblocktracker.md#optional-handlers)
* [off](baseblocktracker.md#off)
* [promise](baseblocktracker.md#promise)
* [reject](baseblocktracker.md#optional-reject)
* [resolve](baseblocktracker.md#optional-resolve)
* [then](baseblocktracker.md#optional-then)

### Methods

* [_cancelBlockResetTimeout](baseblocktracker.md#_cancelblockresettimeout)
* [_end](baseblocktracker.md#_end)
* [_getBlockTrackerEventCount](baseblocktracker.md#_getblocktrackereventcount)
* [_maybeEnd](baseblocktracker.md#_maybeend)
* [_maybeStart](baseblocktracker.md#_maybestart)
* [_newPotentialLatest](baseblocktracker.md#_newpotentiallatest)
* [_onNewListener](baseblocktracker.md#_onnewlistener)
* [_onRemoveListener](baseblocktracker.md#_onremovelistener)
* [_resetCurrentBlock](baseblocktracker.md#_resetcurrentblock)
* [_setCurrentBlock](baseblocktracker.md#_setcurrentblock)
* [_setupBlockResetTimeout](baseblocktracker.md#_setupblockresettimeout)
* [_setupInternalEvents](baseblocktracker.md#_setupinternalevents)
* [_start](baseblocktracker.md#_start)
* [addEventListener](baseblocktracker.md#addeventlistener)
* [getCurrentBlock](baseblocktracker.md#getcurrentblock)
* [getLatestBlock](baseblocktracker.md#getlatestblock)
* [isRunning](baseblocktracker.md#isrunning)
* [listenerCount](baseblocktracker.md#listenercount)
* [on](baseblocktracker.md#on)
* [onData](baseblocktracker.md#ondata)
* [onError](baseblocktracker.md#onerror)
* [once](baseblocktracker.md#once)
* [removeAllListeners](baseblocktracker.md#removealllisteners)
* [removeEventListener](baseblocktracker.md#removeeventlistener)
* [resetHandlers](baseblocktracker.md#resethandlers)

## Constructors

###  constructor

\+ **new BaseBlockTracker**(`opts`: any): *[BaseBlockTracker](baseblocktracker.md)*

*Overrides [Emitter](emitter.md).[constructor](emitter.md#constructor)*

*Defined in [tracker/baseTracker.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L18)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`opts` | any |  {
      blockResetDuration: undefined,
      retryTimeout: undefined,
      keepEventLoopActive: undefined,
      setSkipCacheFlag: false,
    } |

**Returns:** *[BaseBlockTracker](baseblocktracker.md)*

## Properties

### `Optional` _blockResetDuration

• **_blockResetDuration**? : *undefined | number*

*Defined in [tracker/baseTracker.ts:12](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L12)*

___

###  _blockResetTimeout

• **_blockResetTimeout**: *any*

*Defined in [tracker/baseTracker.ts:14](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L14)*

___

###  _currentBlock

• **_currentBlock**: *any*

*Defined in [tracker/baseTracker.ts:16](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L16)*

___

###  _isRunning

• **_isRunning**: *boolean*

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

### `Optional` then

• **then**? : *any*

*Inherited from [Emitter](emitter.md).[then](emitter.md#optional-then)*

*Defined in [providers/emitter.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/providers/emitter.ts#L11)*

## Methods

###  _cancelBlockResetTimeout

▸ **_cancelBlockResetTimeout**(): *void*

*Defined in [tracker/baseTracker.ts:182](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L182)*

**Returns:** *void*

___

###  _end

▸ **_end**(): *void*

*Defined in [tracker/baseTracker.ts:87](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L87)*

**Returns:** *void*

___

###  _getBlockTrackerEventCount

▸ **_getBlockTrackerEventCount**(): *number*

*Defined in [tracker/baseTracker.ts:141](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L141)*

**Returns:** *number*

___

###  _maybeEnd

▸ **_maybeEnd**(): *void*

*Defined in [tracker/baseTracker.ts:132](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L132)*

**Returns:** *void*

___

###  _maybeStart

▸ **_maybeStart**(): *void*

*Defined in [tracker/baseTracker.ts:122](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L122)*

**Returns:** *void*

___

###  _newPotentialLatest

▸ **_newPotentialLatest**(`newBlock`: string): *void*

*Defined in [tracker/baseTracker.ts:147](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`newBlock` | string |

**Returns:** *void*

___

###  _onNewListener

▸ **_onNewListener**(`eventName`: string, `handler?`: `mitt.Handler`): *void*

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

*Defined in [tracker/baseTracker.ts:186](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L186)*

**Returns:** *void*

___

###  _setCurrentBlock

▸ **_setCurrentBlock**(`newBlock`: string): *void*

*Defined in [tracker/baseTracker.ts:161](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L161)*

**Parameters:**

Name | Type |
------ | ------ |
`newBlock` | string |

**Returns:** *void*

___

###  _setupBlockResetTimeout

▸ **_setupBlockResetTimeout**(): *void*

*Defined in [tracker/baseTracker.ts:168](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L168)*

**Returns:** *void*

___

###  _setupInternalEvents

▸ **_setupInternalEvents**(): *void*

*Defined in [tracker/baseTracker.ts:95](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L95)*

**Returns:** *void*

___

###  _start

▸ **_start**(): *void*

*Defined in [tracker/baseTracker.ts:83](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L83)*

**Returns:** *void*

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

###  getCurrentBlock

▸ **getCurrentBlock**(): *any*

*Defined in [tracker/baseTracker.ts:48](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L48)*

**Returns:** *any*

___

###  getLatestBlock

▸ **getLatestBlock**(): *`Promise<any>`*

*Defined in [tracker/baseTracker.ts:52](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L52)*

**Returns:** *`Promise<any>`*

___

###  isRunning

▸ **isRunning**(): *boolean*

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