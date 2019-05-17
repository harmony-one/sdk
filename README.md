[![npm version](https://img.shields.io/npm/v/@harmony-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@harmony-js/core)


# Harmony-SDK-Core

A Harmony's blockchain javascript library

It's a mono-repo library, not yet published to npm.


# Install from npm/yarn

```bash

# npm
npm install @harmony-js/core@next 

# yarn
yarn add @harmony-js/core@next

# tslib may be required, we'd better install it as well
npm install tslib
yarn add tslib

```

# Packages

1. [@harmony-js/core](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-core)
2. [@harmony-js/account](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-account)
3. [@harmony-js/crypto](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-crypto)
4. [@harmony-js/network](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-network)
5. [@harmony-js/utils](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-utils)
6. [@harmony-js/transaction](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-transaction)
7. [@harmony-js/contract](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-contract)


# Manually Build
1. make sure you have latest `node.js` and `yarn` installed

2. git clone
   
   ```bash
   git clone git@github.com:FireStack-Lab/Harmony-sdk-core.git
   cd Harmony-sdk-core
   ```

3. cleanup and build
   
   ```bash
   yarn global add lerna && yarn install && lerna bootstrap && lerna link && yarn dist
   ```


# Test local wallet

1. open examples
2. run `node testWallet.js`
3. you can see `mnemonic` and `simple password` and 10 accounts imported
   

# Test with Harmony node

First you have to run harmony's test node.

1. git clone
   
    ``` bash
    git clone git@github.com:harmony-one/harmony.git
    ```

2. follow the `Build all executables` instruction, [here](https://github.com/harmony-one/harmony/tree/master)
3. open your editor, inside `core/resharding.go` , edit `GenesisShardSize = 50` to `GenesisShardSize = 5`
4. use this script to run
   
   ```bash
   ./test/deploy.sh ./test/configs/ten-oneshard.txt
   ```

Wait for the test-node running for 30 seconds,

Then **open another console** , go back to our `Harmony-sdk-core/examples` folder, 

Run:

``` bash
node testNode.js
```


# Test with `ganache-cli`
** ganache-cli runs in js file **, 

In this case, we use ganache and ethereum's setting to simulate the result

We don't need harmony's testnode running.

1. open `examples`
2. run `node testGanache.js`
