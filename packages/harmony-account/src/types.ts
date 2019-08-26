/**
 * test type docs
 */
export type ShardID = string | number;
export interface BalanceObject {
  balance: string;
  nonce: number;
}
export type Shards = Map<ShardID, BalanceObject>;
