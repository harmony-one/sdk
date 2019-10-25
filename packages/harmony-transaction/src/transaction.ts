import {
  BN,
  encode,
  arrayify,
  hexlify,
  stripZeros,
  Signature,
  splitSignature,
} from '@harmony-js/crypto';
import { add0xToString, numberToHex, ChainType, Unit } from '@harmony-js/utils';
import { Messenger, RPCMethod } from '@harmony-js/network';
import { TxParams, TxStatus } from './types';
import {
  recover,
  transactionFields,
  defaultMessenger,
  transactionFieldsETH,
  recoverETH,
} from './utils';

import { TransactionBase } from './transactionBase';

class Transaction extends TransactionBase {
  private from: string;
  private nonce: number | string;
  private to: string;
  // private shardID: number | string;
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
    super(messenger, txStatus);
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

    this.to = params && params.to ? Transaction.normalizeAddress(params.to) : '0x';
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
      to: Transaction.normalizeAddress(this.to) || '0x',
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
    this.to = params && params.to ? Transaction.normalizeAddress(params.to) : '0x';
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

  isCrossShard(): boolean {
    return new BN(this.txParams.shardID).toString() !== new BN(this.txParams.toShardID).toString();
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

  async confirm(
    txHash: string,
    maxAttempts: number = 20,
    interval: number = 1000,
    shardID: number | string = this.txParams.shardID,
    toShardID: number | string = this.txParams.toShardID,
  ) {
    const txConfirmed = await this.txConfirm(txHash, maxAttempts, interval, shardID);
    if (!this.isCrossShard()) {
      return txConfirmed;
    }
    if (txConfirmed.isConfirmed()) {
      const cxConfirmed = await this.cxConfirm(txHash, maxAttempts, interval, toShardID);
      return cxConfirmed;
    } else {
      return txConfirmed;
    }
  }
}
export { Transaction };
