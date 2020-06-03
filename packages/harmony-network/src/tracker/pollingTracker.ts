/**
 * @packageDocumentation
 * @module harmony-network
 * @hidden
 */

import { BaseBlockTracker } from './baseTracker';
import { Messenger } from '../messenger/messenger';
import { RPCMethod } from '../rpcMethod/rpc';

const sec = 1000;

export function timeout(duration: number, unref: any) {
  return new Promise((resolve) => {
    const timoutRef: any = setTimeout(resolve, duration);
    // don't keep process open
    if (timoutRef.unref && unref) {
      timoutRef.unref();
    }
  });
}
export class PollingBlockTracker extends BaseBlockTracker {
  messenger: Messenger;
  // tslint:disable-next-line: variable-name
  _pollingInterval: number;
  // tslint:disable-next-line: variable-name
  _retryTimeout: number;
  // tslint:disable-next-line: variable-name
  _keepEventLoopActive: boolean;
  // tslint:disable-next-line: variable-name
  _setSkipCacheFlag: boolean;
  constructor(
    messenger: Messenger,
    opts = {
      pollingInterval: undefined,
      retryTimeout: undefined,
      keepEventLoopActive: false,
      setSkipCacheFlag: false,
    },
  ) {
    // parse + validate args
    if (!messenger) {
      throw new Error('PollingBlockTracker - no provider specified.');
    }

    const pollingInterval: number = opts.pollingInterval || 20 * sec;
    const retryTimeout: number = opts.retryTimeout || pollingInterval / 10;
    const keepEventLoopActive: boolean =
      opts.keepEventLoopActive !== undefined ? opts.keepEventLoopActive : true;
    const setSkipCacheFlag = opts.setSkipCacheFlag || false;
    // BaseBlockTracker constructor
    super({
      blockResetDuration: pollingInterval,
      retryTimeout,
      keepEventLoopActive,
      setSkipCacheFlag,
    });
    // config
    this.messenger = messenger;
    this._pollingInterval = pollingInterval;
    this._retryTimeout = retryTimeout;
    this._keepEventLoopActive = keepEventLoopActive;
    this._setSkipCacheFlag = setSkipCacheFlag;
  }

  //
  // public
  //

  // trigger block polling
  async checkForLatestBlock() {
    await this._updateLatestBlock();
    const result = await this.getLatestBlock();
    return result;
  }

  //
  // private
  //

  _start() {
    this._performSync().catch((err) => this.emit('error', err));
  }

  async _performSync() {
    while (this._isRunning) {
      try {
        await this._updateLatestBlock();
        await timeout(this._pollingInterval, !this._keepEventLoopActive);
      } catch (err) {
        const newErr = new Error(
          `PollingBlockTracker - encountered an error while attempting to update latest block:\n${err.stack}`,
        );
        try {
          this.emit('error', newErr);
        } catch (emitErr) {
          console.error(newErr);
        }
        await timeout(this._retryTimeout, !this._keepEventLoopActive);
      }
    }
  }

  async _updateLatestBlock() {
    // fetch + set latest block
    const latestBlock = await this._fetchLatestBlock();
    this._newPotentialLatest(latestBlock);
  }

  async _fetchLatestBlock() {
    try {
      const result = await this.messenger.send(RPCMethod.BlockNumber, []);
      if (result.isError()) {
        throw result.message;
      } else if (result.isResult()) {
        return result.result;
      }
    } catch (error) {
      throw error;
    }
  }
}
