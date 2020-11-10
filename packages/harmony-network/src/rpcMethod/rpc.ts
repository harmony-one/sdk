/**
 # @harmony-js/network

This package provides a collection of apis to create messengers (HTTP, WebSocket) to connect to blockchain networks.

## Installation

```
npm install @harmony-js/network
```

## Usage

```javascript
const { Messenger, HttpProvider, WSProvider } = require('@harmony-js/network');
const { ChainID, ChainType } = require('@harmony-js/utils');
const testnetHTTP = 'https://api.s0.b.hmny.io';
const testnetWS = 'wss://ws.s0.b.hmny.io';
const localHTTP = 'http://localhost:9500/';
const localWS = 'http://localhost:9800/';
const http = new HttpProvider(testnetHTTP); // for local use localHTTP
const ws = new WSProvider(testnetWS); // for local use testnetWS
const customHTTPMessenger = new Messenger(http, ChainType.Harmony, ChainID.HmyTestnet); // for local ChainID.HmyLocal
const customWSMessenger = new Messenger(ws, ChainType.Harmony, ChainID.HmyTestnet); // for local ChainID.HmyLocal
```
 *
 * @packageDocumentation
 * @module harmony-network
 */

/**@ignore */
export enum RPCMethod {
  // 1. hmy_getBlockByHash
  GetBlockByHash = 'hmy_getBlockByHash',
  // 2. hmy_getBlockByNumber
  GetBlockByNumber = 'hmy_getBlockByNumber',
  // 3. hmy_getBlockTransactionCountByHash
  GetBlockTransactionCountByHash = 'hmy_getBlockTransactionCountByHash',
  // 4. hmy_getBlockTransactionCountByNumber
  GetBlockTransactionCountByNumber = 'hmy_getBlockTransactionCountByNumber',
  // 5. hmy_getCode
  GetCode = 'hmy_getCode',
  // 6. hmy_getTransactionByBlockHashAndIndex
  GetTransactionByBlockHashAndIndex = 'hmy_getTransactionByBlockHashAndIndex',
  // 7. hmy_getTransactionByBlockNumberAndIndex
  GetTransactionByBlockNumberAndIndex = 'hmy_getTransactionByBlockNumberAndIndex',
  // 8. hmy_getTransactionByHash
  GetTransactionByHash = 'hmy_getTransactionByHash',

  GetTransactionReceipt = 'hmy_getTransactionReceipt',

  GetCXReceiptByHash = 'hmy_getCXReceiptByHash',
  // 9. hmy_syncing
  Syncing = 'hmy_syncing',
  // 10. net_peerCount
  PeerCount = 'net_peerCount',

  // 11. hmy_getBalance
  GetBalance = 'hmy_getBalance',
  // 12. hmy_getStorageAt
  GetStorageAt = 'hmy_getStorageAt',
  // 13. hmy_getTransactionCount
  GetTransactionCount = 'hmy_getTransactionCount',
  // 14. hmy_sendTransaction
  SendTransaction = 'hmy_sendTransaction',
  // 15. hmy_sendRawTransaction
  SendRawTransaction = 'hmy_sendRawTransaction',
  // 16. hmy_subscribe
  Subscribe = 'hmy_subscribe',
  // 17. hmy_getlogs
  GetPastLogs = 'hmy_getLogs',
  // 18. hmy_getWork
  GetWork = 'hmy_getWork',
  // 19. hmy_submitWork
  // SubmitWork = 'hmy_submitWork',
  // 20. hmy_getProof
  GetProof = 'hmy_getProof',
  // 21, hmy_getFilterChanges
  GetFilterChanges = 'hmy_getFilterChanges',
  // 22. hmy_newPendingTransactionFilter
  NewPendingTransactionFilter = 'hmy_newPendingTransactionFilter',
  // 23. hmy_newBlockFilter
  NewBlockFilter = 'hmy_newBlockFilter',
  // 24. hmy_newFilter
  NewFilter = 'hmy_newFilter',
  // 25. hmy_call
  Call = 'hmy_call',
  // 26. hmy_estimateGas
  EstimateGas = 'hmy_estimateGas',
  // 27. hmy_gasPrice
  GasPrice = 'hmy_gasPrice',
  // 28. hmy_blockNumber
  BlockNumber = 'hmy_blockNumber',
  // 29. hmy_unsubscribe
  UnSubscribe = 'hmy_unsubscribe',
  // 30. net_version
  NetVersion = 'net_version',
  // 31. hmy_protocolVersion
  ProtocolVersion = 'hmy_protocolVersion',
  // 32. hmy_getShardingStructure
  GetShardingStructure = 'hmy_getShardingStructure',
  // 33. hmy_sendRawStakingTransaction
  SendRawStakingTransaction = 'hmy_sendRawStakingTransaction',
  // 34. hmy_getAccountNonce
  GetAccountNonce = 'hmy_getAccountNonce',
}

/**@ignore */
export enum RPCErrorCode {
  // Standard JSON-RPC 2.0 errors
  // RPC_INVALID_REQUEST is internally mapped to HTTP_BAD_REQUEST (400).
  // It should not be used for application-layer errors.
  RPC_INVALID_REQUEST = -32600,
  // RPC_METHOD_NOT_FOUND is internally mapped to HTTP_NOT_FOUND (404).
  // It should not be used for application-layer errors.
  RPC_METHOD_NOT_FOUND = -32601,
  RPC_INVALID_PARAMS = -32602,
  // RPC_INTERNAL_ERROR should only be used for genuine errors in bitcoind
  // (for example datadir corruption).
  RPC_INTERNAL_ERROR = -32603,
  RPC_PARSE_ERROR = -32700,

  // General application defined errors
  RPC_MISC_ERROR = -1, // std::exception thrown in command handling
  RPC_TYPE_ERROR = -3, // Unexpected type was passed as parameter
  RPC_INVALID_ADDRESS_OR_KEY = -5, // Invalid address or key
  RPC_INVALID_PARAMETER = -8, // Invalid, missing or duplicate parameter
  RPC_DATABASE_ERROR = -20, // Database error
  RPC_DESERIALIZATION_ERROR = -22, // Error parsing or validating structure in raw format
  RPC_VERIFY_ERROR = -25, // General error during transaction or block submission
  RPC_VERIFY_REJECTED = -26, // Transaction or block was rejected by network rules
  RPC_IN_WARMUP = -28, // Client still warming up
  RPC_METHOD_DEPRECATED = -32, // RPC method is deprecated
}
