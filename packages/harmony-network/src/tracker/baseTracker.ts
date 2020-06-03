/**
 * @packageDocumentation
 * @module harmony-network
 * @hidden
 */

import { isHex, hexToNumber } from '@harmony-js/utils';
import { Emitter } from '../providers/emitter';

const sec = 1000;

const calculateSum = (accumulator: number, currentValue: number) => accumulator + currentValue;
const blockTrackerEvents = ['sync', 'latest'];

export class BaseBlockTracker extends Emitter {
  // tslint:disable-next-line: variable-name
  _blockResetDuration?: number;
  // tslint:disable-next-line: variable-name
  _blockResetTimeout: any;
  // tslint:disable-next-line: variable-name
  _currentBlock: any;
  // tslint:disable-next-line: variable-name
  _isRunning: boolean;
  constructor(
    opts: any = {
      blockResetDuration: undefined,
      retryTimeout: undefined,
      keepEventLoopActive: undefined,
      setSkipCacheFlag: false,
    },
  ) {
    super();
    // config
    this._blockResetDuration = opts.blockResetDuration || 20 * sec;
    // state
    // tslint:disable-next-line: no-unused-expression
    this._blockResetTimeout;
    this._currentBlock = null;
    this._isRunning = false;
    // bind functions for internal use
    // this._onNewListener = this._onNewListener.bind(this);
    // this._onRemoveListener = this._onRemoveListener.bind(this);
    // this._resetCurrentBlock = this._resetCurrentBlock.bind(this);
    // listen for handler changes
    // this._setupInternalEvents();
    this._maybeStart();
  }

  isRunning() {
    return this._isRunning;
  }

  getCurrentBlock() {
    return this._currentBlock;
  }

  async getLatestBlock() {
    // return if available
    if (this._currentBlock) {
      return this._currentBlock;
    }
    // wait for a new latest block
    const latestBlock = await new Promise((resolve) => this.once('latest', resolve));
    // return newly set current block
    return latestBlock;
  }

  // dont allow module consumer to remove our internal event listeners
  removeAllListeners(eventName: string) {
    // perform default behavior, preserve fn arity
    if (eventName) {
      super.removeEventListener(eventName);
    } else {
      super.removeEventListener('*');
    }
    // re-add internal events
    this._setupInternalEvents();
    // trigger stop check just in case
    this._onRemoveListener('*');
  }

  //
  // to be implemented in subclass
  //

  _start() {
    // default behavior is noop
  }

  _end() {
    // default behavior is noop
  }

  //
  // private
  //

  _setupInternalEvents() {
    // first remove listeners for idempotence
    this.removeEventListener('newListener', this._onNewListener);
    this.removeEventListener('removeListener', this._onRemoveListener);
    // then add them

    this.on('newListener', this._onNewListener);
    this.on('removeListener', this._onRemoveListener);
  }

  _onNewListener(eventName: string, handler?: mitt.Handler) {
    // `newListener` is called *before* the listener is added
    if (!blockTrackerEvents.includes(eventName)) {
      return;
    }

    this._maybeStart();
  }

  _onRemoveListener(eventName: string, handler?: mitt.Handler) {
    // `removeListener` is called *after* the listener is removed
    if (this._getBlockTrackerEventCount() > 0) {
      return;
    }
    this._maybeEnd();
  }

  _maybeStart() {
    if (this._isRunning) {
      return;
    }
    this._isRunning = true;
    // cancel setting latest block to stale
    this._cancelBlockResetTimeout();
    this._start();
  }

  _maybeEnd() {
    if (!this._isRunning) {
      return;
    }
    this._isRunning = false;
    this._setupBlockResetTimeout();
    this._end();
  }

  _getBlockTrackerEventCount() {
    return blockTrackerEvents
      .map((eventName) => this.listenerCount(eventName))
      .reduce(calculateSum);
  }

  _newPotentialLatest(newBlock: string) {
    const currentBlock = this._currentBlock;
    // only update if blok number is higher
    if (
      currentBlock &&
      isHex(currentBlock) &&
      isHex(newBlock) &&
      hexToNumber(newBlock) <= hexToNumber(currentBlock)
    ) {
      return;
    }
    this._setCurrentBlock(newBlock);
  }

  _setCurrentBlock(newBlock: string) {
    const oldBlock = this._currentBlock;
    this._currentBlock = newBlock;
    this.emit('latest', newBlock);
    this.emit('sync', { oldBlock, newBlock });
  }

  _setupBlockResetTimeout() {
    // clear any existing timeout
    this._cancelBlockResetTimeout();
    // clear latest block when stale
    this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration);
    // nodejs - dont hold process open
    if (this._blockResetTimeout.unref) {
      this._blockResetTimeout.unref();
    }
  }

  _cancelBlockResetTimeout() {
    clearTimeout(this._blockResetTimeout);
  }

  _resetCurrentBlock() {
    this._currentBlock = null;
  }
}
