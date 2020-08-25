import { BN, Signature } from '@harmony-js/crypto';
import {
  Directive,
  CreateValidator,
  EditValidator,
  Delegate,
  Undelegate,
  CollectRewards,
} from '@harmony-js/staking';

export interface StakingTxParams {
  directive: Directive;
  stakeMsg: CreateValidator | EditValidator | Delegate | Undelegate | CollectRewards;
  nonce: number | string;
  gasLimit: number | string | BN;
  gasPrice: number | string | BN;
  chainId: number;
  rawTransaction: string;
  unsignedRawTransaction: string;
  signature: Signature;
  from: string;
}
