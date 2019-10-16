import {
  BN,
  encode,
  arrayify,
  hexlify,
  stripZeros,
  Signature,
  splitSignature,
  getAddress,
  HarmonyAddress,
} from '@harmony-js/crypto';
import { add0xToString, numberToHex, ChainType, Unit, hexToNumber } from '@harmony-js/utils';
import {
  Messenger,
  RPCMethod,
  Emitter,
  HttpProvider,
  // WSProvider,
  // SubscribeReturns,
  NewHeaders,
} from '@harmony-js/network';
import { TxParams, TxStatus, TransasctionReceipt } from './types';
import {
  recover,
  transactionFields,
  sleep,
  TransactionEvents,
  defaultMessenger,
  transactionFieldsETH,
  recoverETH,
} from './utils';

class Transaction {
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

  private id: string;
  private from: string;
  private nonce: number | string;
  private to: string;
  private shardID: number | string;
  private toShardID: number | string;
  private gasLimit: BN;
  private gasPrice: BN;
  private data: string;
  private value: BN;
  private chainId: number;
  private rawTransaction: string;
  private unsignedRawTransaction: string;
  private signature: Signature;

  // constructor
  constructor(
    params?: TxParams | any,
    messenger: Messenger = defaultMessenger,
    txStatus = TxStatus.INTIALIZED,
  ) {
    this.messenger = messenger;
    this.txStatus = txStatus;
    this.emitter = new Emitter();

    // intialize transaction
    this.id = params && params.id ? params.id : '0x';
    this.from = params && params.from ? params.from : '0x';
    this.nonce = params && params.nonce ? params.nonce : 0;
    this.gasPrice =
      params && params.gasPrice
        ? new Unit(params.gasPrice).asWei().toWei()
        : new Unit(0).asWei().toWei();
    this.gasLimit =
      params && params.gasLimit
        ? new Unit(params.gasLimit).asWei().toWei()
        : new Unit(0).asWei().toWei();
    this.shardID =
      params && params.shardID !== undefined ? params.shardID : this.messenger.currentShard;
    this.toShardID =
      params && params.toShardID !== undefined ? params.toShardID : this.messenger.currentShard;

    this.to = params && params.to ? this.normalizeAddress(params.to) : '0x';
    this.value =
      params && params.value ? new Unit(params.value).asWei().toWei() : new Unit(0).asWei().toWei();
    this.data = params && params.data ? params.data : '0x';
    // chainid should change with different network settings
    this.chainId = params && params.chainId ? params.chainId : this.messenger.chainId;
    this.rawTransaction = params && params.rawTransaction ? params.rawTransaction : '0x';
    this.unsignedRawTransaction =
      params && params.unsignedRawTransaction ? params.unsignedRawTransaction : '0x';
    this.signature =
      params && params.signature
        ? params.signature
        : {
            r: '',
            s: '',
            recoveryParam: 0,
            v: 0,
          };

    this.receipt = params && params.receipt ? params.receipt : undefined;
    this.cxStatus = this.isCrossShard() ? TxStatus.INTIALIZED : TxStatus.NONE;
  }

  setMessenger(messenger: Messenger) {
    this.messenger = messenger;
  }

  getRLPUnsigned(): [string, any[]] {
    const raw: Array<string | Uint8Array> = [];

    // temp setting to be compatible with eth
    const fields =
      this.messenger.chainType === ChainType.Harmony ? transactionFields : transactionFieldsETH;

    fields.forEach((field: any) => {
      let value = (<any>this.txParams)[field.name] || [];
      value = arrayify(
        hexlify(field.transform === 'hex' ? add0xToString(value.toString(16)) : value),
      );
      // Fixed-width field
      if (field.fix === true && field.length && value.length !== field.length && value.length > 0) {
        throw new Error(`invalid length for ${field.name}`);
      }

      // Variable-width (with a maximum)
      if (field.fix === false && field.length) {
        value = stripZeros(value);
        if (value.length > field.length) {
          throw new Error(`invalid length for ${field.name}`);
        }
      }

      raw.push(hexlify(value));
    });

    if (this.txParams.chainId != null && this.txParams.chainId !== 0) {
      raw.push(hexlify(this.txParams.chainId));
      raw.push('0x');
      raw.push('0x');
    }

    return [encode(raw), raw];
  }

  getRLPSigned(raw: any[], signature: Signature): string {
    // temp setting to be compatible with eth
    const rawLength = this.messenger.chainType === ChainType.Harmony ? 11 : 9;
    const sig = splitSignature(signature);
    let v = 27 + (sig.recoveryParam || 0);
    if (raw.length === rawLength) {
      raw.pop();
      raw.pop();
      raw.pop();
      v += this.chainId * 2 + 8;
    }

    raw.push(hexlify(v));
    raw.push(stripZeros(arrayify(sig.r) || []));
    raw.push(stripZeros(arrayify(sig.s) || []));

    return encode(raw);
  }

  getRawTransaction(): string {
    return this.rawTransaction;
  }

  recover(rawTransaction: string): Transaction {
    // temp setting to be compatible with eth
    const recovered =
      this.messenger.chainType === ChainType.Harmony
        ? recover(rawTransaction)
        : recoverETH(rawTransaction);

    this.setParams(recovered);
    return this;
  }
  // use when using eth_sendTransaction
  get txPayload() {
    return {
      from: this.txParams.from || '0x',
      to: this.txParams.to || '0x',
      shardID: this.txParams.shardID ? numberToHex(this.shardID) : '0x',
      toShardID: this.txParams.toShardID ? numberToHex(this.toShardID) : '0x',
      gas: this.txParams.gasLimit ? numberToHex(this.txParams.gasLimit) : '0x',
      gasPrice: this.txParams.gasPrice ? numberToHex(this.txParams.gasPrice) : '0x',
      value: this.txParams.value ? numberToHex(this.txParams.value) : '0x',
      data: this.txParams.data || '0x',
      nonce: this.txParams.nonce ? numberToHex(this.nonce) : '0x',
    };
  }

  get txParams(): TxParams {
    return {
      id: this.id || '0x',
      from: this.from || '',
      nonce: this.nonce || 0,
      gasPrice: this.gasPrice || new Unit(0).asWei().toWei(),
      gasLimit: this.gasLimit || new Unit(0).asWei().toWei(),
      shardID: this.shardID !== undefined ? this.shardID : this.messenger.currentShard,
      toShardID: this.toShardID !== undefined ? this.toShardID : this.messenger.currentShard,
      to: this.normalizeAddress(this.to) || '0x',
      value: this.value || new Unit(0).asWei().toWei(),
      data: this.data || '0x',
      chainId: this.chainId || 0,
      rawTransaction: this.rawTransaction || '0x',
      unsignedRawTransaction: this.unsignedRawTransaction || '0x',
      signature: this.signature || '0x',
    };
  }
  setParams(params: TxParams) {
    this.id = params && params.id ? params.id : '0x';
    this.from = params && params.from ? params.from : '0x';
    this.nonce = params && params.nonce ? params.nonce : 0;
    this.gasPrice =
      params && params.gasPrice
        ? new Unit(params.gasPrice).asWei().toWei()
        : new Unit(0).asWei().toWei();
    this.gasLimit =
      params && params.gasLimit
        ? new Unit(params.gasLimit).asWei().toWei()
        : new Unit(0).asWei().toWei();
    this.shardID =
      params && params.shardID !== undefined ? params.shardID : this.messenger.currentShard;
    this.toShardID =
      params && params.toShardID !== undefined ? params.toShardID : this.messenger.currentShard;
    this.to = params && params.to ? this.normalizeAddress(params.to) : '0x';
    this.value =
      params && params.value ? new Unit(params.value).asWei().toWei() : new Unit(0).asWei().toWei();
    this.data = params && params.data ? params.data : '0x';
    this.chainId = params && params.chainId ? params.chainId : 0;
    this.rawTransaction = params && params.rawTransaction ? params.rawTransaction : '0x';
    this.unsignedRawTransaction =
      params && params.unsignedRawTransaction ? params.unsignedRawTransaction : '0x';
    this.signature =
      params && params.signature
        ? params.signature
        : {
            r: '',
            s: '',
            recoveryParam: 0,
            v: 0,
          };
    if (this.rawTransaction !== '0x') {
      this.setTxStatus(TxStatus.SIGNED);
    } else {
      this.setTxStatus(TxStatus.INTIALIZED);
    }
  }

  map(fn: any) {
    const newParams = fn(this.txParams);
    this.setParams(newParams);

    return this;
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
  isCrossShard(): boolean {
    return new BN(this.txParams.shardID).toString() !== new BN(this.txParams.toShardID).toString();
  }

  observed() {
    return this.emitter;
  }

  async sendTransaction(): Promise<[Transaction, string]> {
    if (this.rawTransaction === 'tx' || this.rawTransaction === undefined) {
      throw new Error('Transaction not signed');
    }
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }

    // const fromShard = this.shardID;
    // const toShard = this.toShardID;
    // await this.messenger.setShardingProviders();
    const res = await this.messenger.send(
      RPCMethod.SendRawTransaction,
      this.rawTransaction,
      this.messenger.chainType,
      typeof this.shardID === 'string' ? Number.parseInt(this.shardID, 10) : this.shardID,
    );

    // temporarilly hard coded
    if (res.isResult()) {
      this.id = res.result;
      this.emitTransactionHash(this.id);
      this.setTxStatus(TxStatus.PENDING);
      // await this.confirm(this.id, 20, 1000);
      return [this, res.result];
    } else if (res.isError()) {
      this.emitConfirm(`transaction failed:${res.error.message}`);
      this.setTxStatus(TxStatus.REJECTED);
      return [this, `transaction failed:${res.error.message}`];
    } else {
      this.emitError('transaction failed');
      throw new Error('transaction failed');
    }
  }

  async trackTx(txHash: string, shardID: number | string = this.shardID) {
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

  async confirm(
    txHash: string,
    maxAttempts: number = 20,
    interval: number = 1000,
    shardID: number | string = this.shardID,
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
    shardID: number | string = this.shardID,
  ): Promise<Transaction> {
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
        typeof this.txParams.shardID === 'string'
          ? Number.parseInt(this.txParams.shardID, 10)
          : this.txParams.shardID,
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
    shardID: number | string = this.txParams.shardID,
    toShardID: number | string = this.txParams.toShardID,
  ) {
    const normalConfirmed = await this.confirm(txHash, maxAttempts, interval, shardID);
    if (this.isCrossShard()) {
      if (normalConfirmed.isConfirmed()) {
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
              // await sleep(interval * attempt);
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
    } else {
      return normalConfirmed;
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
      this.cxStatus = TxStatus.REJECTED;
      return false;
    }
  }

  socketCxConfirm(
    txHash: string,
    maxAttempts: number = 20,
    toShardID: number | string = this.txParams.toShardID,
  ): Promise<Transaction> {
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
  normalizeAddress(address: string) {
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
}
export { Transaction };
