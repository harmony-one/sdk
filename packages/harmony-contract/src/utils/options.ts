export interface ContractOptions {
  data?: string;
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
