> **[@harmony-js/network](../README.md)**

[PollingBlockTracker](pollingblocktracker.md) /

# Class: PollingBlockTracker

## Hierarchy

  * [BaseBlockTracker](baseblocktracker.md)

  * **PollingBlockTracker**

## Index

### Constructors

* [constructor](pollingblocktracker.md#constructor)

### Properties

* [_blockResetDuration](pollingblocktracker.md#optional-_blockresetduration)
* [_blockResetTimeout](pollingblocktracker.md#_blockresettimeout)
* [_currentBlock](pollingblocktracker.md#_currentblock)
* [_isRunning](pollingblocktracker.md#_isrunning)
* [_keepEventLoopActive](pollingblocktracker.md#_keepeventloopactive)
* [_pollingInterval](pollingblocktracker.md#_pollinginterval)
* [_retryTimeout](pollingblocktracker.md#_retrytimeout)
* [_setSkipCacheFlag](pollingblocktracker.md#_setskipcacheflag)
* [emit](pollingblocktracker.md#emit)
* [emitter](pollingblocktracker.md#emitter)
* [handlers](pollingblocktracker.md#optional-handlers)
* [messenger](pollingblocktracker.md#messenger)
* [off](pollingblocktracker.md#off)
* [promise](pollingblocktracker.md#promise)
* [reject](pollingblocktracker.md#optional-reject)
* [resolve](pollingblocktracker.md#optional-resolve)
* [then](pollingblocktracker.md#optional-then)

### Methods

* [_cancelBlockResetTimeout](pollingblocktracker.md#_cancelblockresettimeout)
* [_end](pollingblocktracker.md#_end)
* [_fetchLatestBlock](pollingblocktracker.md#_fetchlatestblock)
* [_getBlockTrackerEventCount](pollingblocktracker.md#_getblocktrackereventcount)
* [_maybeEnd](pollingblocktracker.md#_maybeend)
* [_maybeStart](pollingblocktracker.md#_maybestart)
* [_newPotentialLatest](pollingblocktracker.md#_newpotentiallatest)
* [_onNewListener](pollingblocktracker.md#_onnewlistener)
* [_onRemoveListener](pollingblocktracker.md#_onremovelistener)
* [_performSync](pollingblocktracker.md#_performsync)
* [_resetCurrentBlock](pollingblocktracker.md#_resetcurrentblock)
* [_setCurrentBlock](pollingblocktracker.md#_setcurrentblock)
* [_setupBlockResetTimeout](pollingblocktracker.md#_setupblockresettimeout)
* [_setupInternalEvents](pollingblocktracker.md#_setupinternalevents)
* [_start](pollingblocktracker.md#_start)
* [_updateLatestBlock](pollingblocktracker.md#_updatelatestblock)
* [addEventListener](pollingblocktracker.md#addeventlistener)
* [checkForLatestBlock](pollingblocktracker.md#checkforlatestblock)
* [getCurrentBlock](pollingblocktracker.md#getcurrentblock)
* [getLatestBlock](pollingblocktracker.md#getlatestblock)
* [isRunning](pollingblocktracker.md#isrunning)
* [listenerCount](pollingblocktracker.md#listenercount)
* [on](pollingblocktracker.md#on)
* [onData](pollingblocktracker.md#ondata)
* [onError](pollingblocktracker.md#onerror)
* [once](pollingblocktracker.md#once)
* [removeAllListeners](pollingblocktracker.md#removealllisteners)
* [removeEventListener](pollingblocktracker.md#removeeventlistener)
* [resetHandlers](pollingblocktracker.md#resethandlers)

## Constructors

###  constructor

\+ **new PollingBlockTracker**(`messenger`: [Messenger](messenger.md), `opts`: object): *[PollingBlockTracker](pollingblocktracker.md)*

*Overrides [BaseBlockTracker](baseblocktracker.md).[constructor](baseblocktracker.md#constructor)*

*Defined in [tracker/pollingTracker.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L25)*

**Parameters:**

▪ **messenger**: *[Messenger](messenger.md)*

▪`Default value`  **opts**: *object*=  {
      pollingInterval: undefined,
      retryTimeout: undefined,
      keepEventLoopActive: false,
      setSkipCacheFlag: false,
    }

Name | Type | Default |
------ | ------ | ------ |
`keepEventLoopActive` | boolean | false |
`pollingInterval` | undefined |  undefined |
`retryTimeout` | undefined |  undefined |
`setSkipCacheFlag` | boolean | false |

**Returns:** *[PollingBlockTracker](pollingblocktracker.md)*

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

###  _keepEventLoopActive

• **_keepEventLoopActive**: *boolean*

*Defined in [tracker/pollingTracker.ts:23](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L23)*

___

###  _pollingInterval

• **_pollingInterval**: *number*

*Defined in [tracker/pollingTracker.ts:19](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L19)*

___

###  _retryTimeout

• **_retryTimeout**: *number*

*Defined in [tracker/pollingTracker.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L21)*

___

###  _setSkipCacheFlag

• **_setSkipCacheFlag**: *boolean*

*Defined in [tracker/pollingTracker.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L25)*

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

*Defined in [tracker/pollingTracker.ts:17](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L17)*

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

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_cancelBlockResetTimeout](baseblocktracker.md#_cancelblockresettimeout)*

*Defined in [tracker/baseTracker.ts:182](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L182)*

**Returns:** *void*

___

###  _end

▸ **_end**(): *void*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_end](baseblocktracker.md#_end)*

*Defined in [tracker/baseTracker.ts:87](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L87)*

**Returns:** *void*

___

###  _fetchLatestBlock

▸ **_fetchLatestBlock**(): *`Promise<any>`*

*Defined in [tracker/pollingTracker.ts:106](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L106)*

**Returns:** *`Promise<any>`*

___

###  _getBlockTrackerEventCount

▸ **_getBlockTrackerEventCount**(): *number*

*Inherited from [BaseBlockTracker](baseblocktracker.md).[_getBlockTrackerEventCount](baseblocktracker.md#_getblocktrackereventcount)*

*Defined in [tracker/baseTracker.ts:141](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/baseTracker.ts#L141)*

**Returns:** *number*

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

###  _performSync

▸ **_performSync**(): *`Promise<void>`*

*Defined in [tracker/pollingTracker.ts:79](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L79)*

**Returns:** *`Promise<void>`*

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

▸ **_start**(): *void*

*Overrides [BaseBlockTracker](baseblocktracker.md).[_start](baseblocktracker.md#_start)*

*Defined in [tracker/pollingTracker.ts:75](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L75)*

**Returns:** *void*

___

###  _updateLatestBlock

▸ **_updateLatestBlock**(): *`Promise<void>`*

*Defined in [tracker/pollingTracker.ts:100](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L100)*

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

*Defined in [tracker/pollingTracker.ts:65](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/tracker/pollingTracker.ts#L65)*

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