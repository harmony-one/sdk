/**
 * @packageDocumentation
 * @module harmony-contract
 * @hidden
 */

export interface ContractOptions {
  data?: string;
  shardID?: number;
  address?: string;
  defaultAccount?: string;
  defaultBlock?: string;
  defaultGas?: string;
  defaultGasPrice?: string;
  transactionBlockTimeout?: number;
  transactionConfirmationBlocks?: string;
  transactionPollingTimeout?: number;
  transactionSigner?: any;
}
