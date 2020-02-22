/**
 * @packageDocumentation
 * @module harmony-transaction
 * @hidden
 */

import { BN, getAddress, HarmonyAddress } from '@harmony-js/crypto';
import { hexToNumber } from '@harmony-js/utils';
import { Messenger, RPCMethod, Emitter, HttpProvider, NewHeaders } from '@harmony-js/network';
import { TxStatus, TransasctionReceipt } from './types';
import { sleep, TransactionEvents } from './utils';
import { AbstractTransaction } from './abstractTransaction';

export class TransactionBase implements AbstractTransaction {
  static normalizeAddress(address: string) {
    if (address === '0x') {
      return '0x';
    } else if (
      HarmonyAddress.isValidChecksum(address) ||
      HarmonyAddress.isValidBech32(address) ||
      HarmonyAddress.isValidBech32TestNet(address)
    ) {
      return getAddress(address).checksum;
    } else {
      throw new Error(`Address format is not supported`);
    }
  }
  emitter: Emitter;
  messenger: Messenger;
  txStatus: TxStatus;
  blockNumbers: string[] = [];
  confirmations: number = 0;
  confirmationCheck: number = 0;
  cxStatus: TxStatus = TxStatus.INTIALIZED;
  cxBlockNumbers: string[] = [];
  cxConfirmations: number = 0;
  cxConfirmationCheck: number = 0;
  receipt?: TransasctionReceipt;

  id: string;
  shardID: number | string;

  constructor(messenger: Messenger, txStatus: TxStatus) {
    this.messenger = messenger;
    this.txStatus = txStatus;
    this.emitter = new Emitter();
    this.id = '0x';
    this.shardID = this.messenger.currentShard;
  }

  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  setTxStatus(txStatus: TxStatus): void {
    this.txStatus = txStatus;
  }

  getTxStatus(): TxStatus {
    return this.txStatus;
  }
  setCxStatus(cxStatus: TxStatus): void {
    this.cxStatus = cxStatus;
  }

  getCxStatus(): TxStatus {
    return this.cxStatus;
  }

  // get status
  isInitialized(): boolean {
    return this.getTxStatus() === TxStatus.INTIALIZED;
  }
  isSigned(): boolean {
    return this.getTxStatus() === TxStatus.SIGNED;
  }
  isPending(): boolean {
    return this.getTxStatus() === TxStatus.PENDING;
  }
  isRejected(): boolean {
    return this.getTxStatus() === TxStatus.REJECTED;
  }
  isConfirmed(): boolean {
    return this.getTxStatus() === TxStatus.CONFIRMED;
  }
  isCxPending(): boolean {
    return this.getCxStatus() === TxStatus.PENDING;
  }
  isCxRejected(): boolean {
    return this.getCxStatus() === TxStatus.REJECTED;
  }
  isCxConfirmed(): boolean {
    return this.getCxStatus() === TxStatus.CONFIRMED;
  }
  observed() {
    return this.emitter;
  }

  async trackTx(txHash: string, shardID: number | string) {
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }
    // TODO: regex validation for txHash so we don't get garbage
    const res = await this.messenger.send(
      RPCMethod.GetTransactionReceipt,
      txHash,
      this.messenger.chainType,
      typeof shardID === 'string' ? Number.parseInt(shardID, 10) : shardID,
    );
    if (res.isResult() && res.result !== null) {
      this.receipt = res.result;
      this.emitReceipt(this.receipt);
      this.id = res.result.transactionHash;
      this.confirmations += 1;

      if (this.receipt) {
        if (this.receipt.status && this.receipt.status === '0x1') {
          this.receipt.byzantium = true;
          this.txStatus = TxStatus.CONFIRMED;
        } else if (this.receipt.status && this.receipt.status === '0x0') {
          this.receipt.byzantium = true;
          this.txStatus = TxStatus.REJECTED;
        } else if (this.receipt.status === undefined && this.receipt.root) {
          this.receipt.byzantium = false;
          this.txStatus = TxStatus.CONFIRMED;
        }
        return true;
      } else {
        this.txStatus = TxStatus.PENDING;
        const currentBlock = await this.getBlockNumber(shardID);

        this.blockNumbers.push('0x' + currentBlock.toString('hex'));

        this.confirmationCheck += 1;
        return false;
      }
    } else {
      this.txStatus = TxStatus.PENDING;
      const currentBlock = await this.getBlockNumber(shardID);
      this.blockNumbers.push('0x' + currentBlock.toString('hex'));
      this.confirmationCheck += 1;
      return false;
    }
  }

  async txConfirm(
    txHash: string,
    maxAttempts: number = 20,
    interval: number = 1000,
    shardID: number | string,
  ) {
    if (this.messenger.provider instanceof HttpProvider) {
      this.txStatus = TxStatus.PENDING;
      const oldBlock = await this.getBlockNumber(shardID);
      let checkBlock = oldBlock;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          const newBlock = await this.getBlockNumber(shardID);
          // TODO: this is super ugly, must be a better way doing this
          const nextBlock = checkBlock.add(new BN(attempt === 0 ? attempt : 1));

          if (newBlock.gte(nextBlock)) {
            checkBlock = newBlock;
            this.emitTrack({
              txHash,
              attempt,
              currentBlock: checkBlock.toString(),
              shardID,
            });

            if (await this.trackTx(txHash, shardID)) {
              this.emitConfirm(this.txStatus);
              return this;
            }
          } else {
            attempt = attempt - 1 >= 0 ? attempt - 1 : 0;
          }
        } catch (err) {
          this.txStatus = TxStatus.REJECTED;
          this.emitConfirm(this.txStatus);
          throw err;
        }

        if (attempt + 1 < maxAttempts) {
          // await sleep(interval * attempt);
          await sleep(interval);
        }
      }
      this.txStatus = TxStatus.REJECTED;
      this.emitConfirm(this.txStatus);
      throw new Error(`The transaction is still not confirmed after ${maxAttempts} attempts.`);
    } else {
      try {
        if (await this.trackTx(txHash, shardID)) {
          this.emitConfirm(this.txStatus);
          return this;
        } else {
          const result = await this.socketConfirm(txHash, maxAttempts, shardID);
          return result;
        }
      } catch (error) {
        this.txStatus = TxStatus.REJECTED;
        this.emitConfirm(this.txStatus);
        throw new Error(
          `The transaction is still not confirmed after ${maxAttempts * interval} mil seconds.`,
        );
      }
    }
  }

  socketConfirm(
    txHash: string,
    maxAttempts: number = 20,
    shardID: number | string,
  ): Promise<TransactionBase> {
    return new Promise((resolve, reject) => {
      const newHeads = Promise.resolve(
        new NewHeaders(
          this.messenger,
          typeof shardID === 'string' ? Number.parseInt(shardID, 10) : shardID,
        ),
      );
      newHeads.then((p) => {
        p.onData(async (data: any) => {
          const blockNumber =
            this.messenger.chainPrefix === 'hmy'
              ? data.params.result.Header.number
              : data.params.result.number;
          this.emitTrack({
            txHash,
            attempt: this.confirmationCheck,
            currentBlock: hexToNumber(blockNumber),
            shardID,
          });
          if (!this.blockNumbers.includes(blockNumber)) {
            if (await this.trackTx(txHash, shardID)) {
              this.emitConfirm(this.txStatus);
              await p.unsubscribe();
              resolve(this);
            } else {
              if (this.confirmationCheck === maxAttempts) {
                this.txStatus = TxStatus.REJECTED;
                this.emitConfirm(this.txStatus);
                await p.unsubscribe();
                resolve(this);
              }
            }
          }
        }).onError(async (error: any) => {
          this.txStatus = TxStatus.REJECTED;
          this.emitConfirm(this.txStatus);
          this.emitError(error);
          await p.unsubscribe();
          reject(error);
        });
      });
    });
  }

  emitTransactionHash(transactionHash: string) {
    this.emitter.emit(TransactionEvents.transactionHash, transactionHash);
  }
  emitReceipt(receipt: any) {
    this.emitter.emit(TransactionEvents.receipt, receipt);
  }
  emitError(error: any) {
    this.emitter.emit(TransactionEvents.error, error);
  }
  emitConfirm(data: any) {
    this.emitter.emit(TransactionEvents.confirmation, data);
  }
  emitTrack(data: any) {
    this.emitter.emit(TransactionEvents.track, data);
  }
  emitCxReceipt(receipt: any) {
    this.emitter.emit(TransactionEvents.cxReceipt, receipt);
  }
  emitCxConfirm(data: any) {
    this.emitter.emit(TransactionEvents.cxConfirmation, data);
  }
  emitCxTrack(data: any) {
    this.emitter.emit(TransactionEvents.cxTrack, data);
  }

  async getBlockNumber(shardID: number | string): Promise<BN> {
    try {
      const currentBlock = await this.messenger.send(
        RPCMethod.BlockNumber,
        [],
        this.messenger.chainPrefix,
        typeof shardID === 'string' ? Number.parseInt(shardID, 10) : shardID,
      );
      if (currentBlock.isError()) {
        throw currentBlock.message;
      }
      return new BN(currentBlock.result.replace('0x', ''), 'hex');
    } catch (error) {
      throw error;
    }
  }
  async getBlockByNumber(blockNumber: string) {
    try {
      const block = await this.messenger.send(
        RPCMethod.GetBlockByNumber,
        [blockNumber, true],
        this.messenger.chainPrefix,
        typeof this.shardID === 'string' ? Number.parseInt(this.shardID, 10) : this.shardID,
      );
      if (block.isError()) {
        throw block.message;
      }
      return block.result;
    } catch (error) {
      throw error;
    }
  }

  async cxConfirm(
    txHash: string,
    maxAttempts: number = 20,
    interval: number = 1000,
    toShardID: number | string,
  ) {
    if (this.messenger.provider instanceof HttpProvider) {
      const oldBlock = await this.getBlockNumber(toShardID);
      let checkBlock = oldBlock;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          const newBlock = await this.getBlockNumber(toShardID);
          // TODO: this is super ugly, must be a better way doing this
          const nextBlock = checkBlock.add(new BN(attempt === 0 ? attempt : 1));

          if (newBlock.gte(nextBlock)) {
            checkBlock = newBlock;
            this.emitCxTrack({
              txHash,
              attempt,
              currentBlock: checkBlock.toString(),
              toShardID,
            });

            if (await this.trackCx(txHash, toShardID)) {
              this.emitCxConfirm(this.cxStatus);
              return this;
            }
          } else {
            attempt = attempt - 1 >= 0 ? attempt - 1 : 0;
          }
        } catch (err) {
          this.cxStatus = TxStatus.REJECTED;
          this.emitCxConfirm(this.cxStatus);
          throw err;
        }
        if (attempt + 1 < maxAttempts) {
          await sleep(interval);
        }
      }
      this.cxStatus = TxStatus.REJECTED;
      this.emitCxConfirm(this.cxStatus);
      throw new Error(`The transaction is still not confirmed after ${maxAttempts} attempts.`);
    } else {
      try {
        if (await this.trackCx(txHash, toShardID)) {
          this.emitCxConfirm(this.cxStatus);
          return this;
        } else {
          const result = await this.socketCxConfirm(txHash, maxAttempts, toShardID);
          return result;
        }
      } catch (error) {
        this.cxStatus = TxStatus.REJECTED;
        this.emitCxConfirm(this.cxStatus);
        throw new Error(
          `The transaction is still not confirmed after ${maxAttempts * interval} mil seconds.`,
        );
      }
    }
  }

  async trackCx(txHash: string, toShardID: number | string) {
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }
    // TODO: regex validation for txHash so we don't get garbage
    const res = await this.messenger.send(
      RPCMethod.GetCXReceiptByHash,
      txHash,
      this.messenger.chainPrefix,
      typeof toShardID === 'string' ? Number.parseInt(toShardID, 10) : toShardID,
    );
    if (res.isResult() && res.result !== null) {
      this.emitCxReceipt(res.result);
      this.cxStatus = TxStatus.CONFIRMED;
      return true;
    } else {
      const currentBlock = await this.getBlockNumber(toShardID);
      this.cxBlockNumbers.push('0x' + currentBlock.toString('hex'));
      this.cxConfirmationCheck += 1;
      this.cxStatus = TxStatus.PENDING;
      return false;
    }
  }

  socketCxConfirm(
    txHash: string,
    maxAttempts: number = 20,
    toShardID: number | string,
  ): Promise<TransactionBase> {
    return new Promise((resolve, reject) => {
      const newHeads = Promise.resolve(
        new NewHeaders(
          this.messenger,
          typeof toShardID === 'string' ? Number.parseInt(toShardID, 10) : toShardID,
        ),
      );
      newHeads.then((p) => {
        p.onData(async (data: any) => {
          const blockNumber =
            this.messenger.chainPrefix === 'hmy'
              ? data.params.result.Header.number
              : data.params.result.number;
          this.emitCxTrack({
            txHash,
            attempt: this.cxConfirmationCheck,
            currentBlock: hexToNumber(blockNumber),
            toShardID,
          });
          if (!this.blockNumbers.includes(blockNumber)) {
            if (await this.trackCx(txHash, toShardID)) {
              this.emitCxConfirm(this.cxStatus);
              await p.unsubscribe();
              resolve(this);
            } else {
              if (this.cxConfirmationCheck === maxAttempts) {
                this.cxStatus = TxStatus.REJECTED;
                this.emitCxConfirm(this.cxStatus);
                await p.unsubscribe();
                resolve(this);
              }
            }
          }
        }).onError(async (error: any) => {
          this.cxStatus = TxStatus.REJECTED;
          this.emitCxConfirm(this.cxStatus);
          this.emitError(error);
          await p.unsubscribe();
          reject(error);
        });
      });
    });
  }
}
