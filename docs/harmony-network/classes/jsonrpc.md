> **[@harmony-js/network](../README.md)**

[JsonRpc](jsonrpc.md) /

# Class: JsonRpc

**`class`** JsonRpc

**`description`** json rpc instance

**`returns`** Json RPC instance

## Hierarchy

* **JsonRpc**

## Index

### Constructors

* [constructor](jsonrpc.md#constructor)

### Properties

* [messageId](jsonrpc.md#messageid)

### Methods

* [toPayload](jsonrpc.md#topayload)

## Constructors

###  constructor

\+ **new JsonRpc**(): *[JsonRpc](jsonrpc.md)*

*Defined in [rpcMethod/builder.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/rpcMethod/builder.ts#L9)*

**Returns:** *[JsonRpc](jsonrpc.md)*

## Properties

###  messageId

• **messageId**: *number*

*Defined in [rpcMethod/builder.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/rpcMethod/builder.ts#L9)*

## Methods

###  toPayload

▸ **toPayload**(`method`: [RPCMethod](../enums/rpcmethod.md) | string, `params`: string | undefined | any[]): *[RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any*›*

*Defined in [rpcMethod/builder.ts:27](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/rpcMethod/builder.ts#L27)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`method` | [RPCMethod](../enums/rpcmethod.md) \| string | RPC method |
`params` | string \| undefined \| any[] | params that send to RPC |

**Returns:** *[RPCRequestPayload](../interfaces/rpcrequestpayload.md)‹*any*›*

payload object