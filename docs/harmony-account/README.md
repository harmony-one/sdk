> **[@harmony-js/account](README.md)**

## Index

### Classes

* [Account](classes/account.md)
* [HDNode](classes/hdnode.md)
* [Wallet](classes/wallet.md)

### Type aliases

* [ShardID](README.md#shardid)
* [Shards](README.md#shards)

### Variables

* [defaultMessenger](README.md#const-defaultmessenger)

## Type aliases

###  ShardID

Ƭ **ShardID**: *string | number*

*Defined in [types.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/types.ts#L4)*

test type docs

___

###  Shards

Ƭ **Shards**: *`Map<ShardID, string>`*

*Defined in [types.ts:5](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/types.ts#L5)*

## Variables

### `Const` defaultMessenger

• **defaultMessenger**: *`Messenger`* =  new Messenger(
  new HttpProvider('http://localhost:8545'),
  ChainType.Harmony,
)

*Defined in [utils.ts:4](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-account/src/utils.ts#L4)*