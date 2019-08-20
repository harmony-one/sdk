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
import { add0xToString, numberToHex, ChainType, Unit } from '@harmony-js/utils';
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
    this.shardID = params && params.shardID ? params.shardID : 0;
    this.toShardID = params && params.toShardID ? params.toShardID : 0;

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
    const rawLength = this.messenger.chainType === ChainType.Harmony ? 10 : 9;
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
      shardID: this.shardID || 0,
      toShardID: this.toShardID || 0,
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
    this.shardID = params && params.shardID ? params.shardID : 0;
    this.toShardID = params && params.toShardID ? params.toShardID : 0;
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

  observed() {
    return this.emitter;
  }

  async sendTransaction(): Promise<[Transaction, string]> {
    // TODO: we use eth RPC setting for now, incase we have other params, we should add here
    if (this.rawTransaction === 'tx' || this.rawTransaction === undefined) {
      throw new Error('Transaction not signed');
    }
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }
    const res = await this.messenger.send(RPCMethod.SendRawTransaction, this.rawTransaction);

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

  async trackTx(txHash: string) {
    if (!this.messenger) {
      throw new Error('Messenger not found');
    }
    // TODO: regex validation for txHash so we don't get garbage
    const res = await this.messenger.send(RPCMethod.GetTransactionReceipt, txHash);

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
        const currentBlock = await this.getBlockNumber();

        this.blockNumbers.push('0x' + currentBlock.toString('hex'));

        this.confirmationCheck += 1;
        return false;
      }
    } else {
      this.txStatus = TxStatus.PENDING;
      const currentBlock = await this.getBlockNumber();
      this.blockNumbers.push('0x' + currentBlock.toString('hex'));
      this.confirmationCheck += 1;
      return false;
    }
  }

  async confirm(txHash: string, maxAttempts: number = 20, interval: number = 1000) {
    if (this.messenger.provider instanceof HttpProvider) {
      this.txStatus = TxStatus.PENDING;
      const oldBlock = await this.getBlockNumber();
      let checkBlock = oldBlock;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          const newBlock = await this.getBlockNumber();
          // TODO: this is super ugly, must be a better way doing this
          const nextBlock = checkBlock.add(new BN(attempt === 0 ? attempt : 1));

          if (newBlock.gte(nextBlock)) {
            checkBlock = newBlock;

            if (await this.trackTx(txHash)) {
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
        if (await this.trackTx(txHash)) {
          this.emitConfirm(this.txStatus);
          return this;
        } else {
          const result = await this.socketConfirm(txHash, maxAttempts);
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

  socketConfirm(txHash: string, maxAttempts: number = 20): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      const newHeads = Promise.resolve(new NewHeaders(this.messenger));
      newHeads.then((p) => {
        p.onData(async (data: any) => {
          if (!this.blockNumbers.includes(data.params.result.number)) {
            if (await this.trackTx(txHash)) {
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

  async getBlockNumber(): Promise<BN> {
    try {
      const currentBlock = await this.messenger.send(RPCMethod.BlockNumber, []);
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
      const block = await this.messenger.send(RPCMethod.GetBlockByNumber, [blockNumber, true]);
      if (block.isError()) {
        throw block.message;
      }
      return block.result;
    } catch (error) {
      throw error;
    }
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
