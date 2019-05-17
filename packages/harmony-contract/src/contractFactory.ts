import { Wallet } from '@harmony-js/account';
import { Contract } from './contract';
import { ContractOptions } from './utils/options';

export class ContractFactory {
  wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }
  createContract(abi: any[], address?: string, options?: ContractOptions) {
    return new Contract(abi, address, options, this.wallet);
  }
}
