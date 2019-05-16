# Harmony-SDK-Core

A Harmony's blockchain javascript library

It's a mono-repo library, not yet published to npm.

# Packages

1. [harmony-core](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-core)
2. [harmony-account](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-account)
3. [harmony-crypto](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-crypto)
4. [harmony-network](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-network)
5. [harmony-utils](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-utils)
6. [harmony-transaction](https://github.com/FireStack-Lab/Harmony-sdk-core/tree/master/packages/harmony-transaction)


# Install and Build
1. make sure you have latest `node.js` and `yarn` installed

2. git clone
   
   ```bash
   git clone git@github.com:FireStack-Lab/Harmony-sdk-core.git
   cd Harmony-sdk-core
   ```

3. cleanup and build
   
   ```bash
   yarn global add lerna && yarn install && yarn bootstrap && yarn dist
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

In this case, we use geth to simulate the result, we don't need harmony's testnode running.

1. open `examples`
2. run `node testGanache.js`
