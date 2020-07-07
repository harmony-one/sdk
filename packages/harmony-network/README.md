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