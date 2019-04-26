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
   yarn install && yarn bootstrap && yarn dist
   ```


# Test local wallet

1. open examples
2. run `node testWallet.js`
3. you can see `mnemonic` and `simple password` and 10 accounts imported
   

# Test Harmony node
1. install harmony-node and use branch `ricl-web3`
2. build it and run
3. open `examples`
4. run `node testNode.js`

