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


# Usage
1. git clone and make sure you have `node.js` and `yarn` installed
2. cleanup and build
   
   ```bash
   yarn install && yarn bootstrap && yarn dist
   ```
3. open folder `examples` and `node testNode.js`


# Example
** This package is not published to npm **

```js

const { Account, Wallet } = require('@harmony/account');
const { isAddress, isPrivateKey, numberToHex } = require('@harmony/utils');


async function createAndEncrypt() {
  const wallet = new Wallet();

  const mne = wallet.generateMnemonic();

  console.log('---hint: please write these down');
  console.log(`${mne}`);

  const newAcc = wallet.addByMnemonic(mne);

  const password = '123456';
  console.log('---hint: we use this dump password to encrypt, lol');
  console.log(`${password}`);

  await wallet.encryptAccount(newAcc.address, password);

  console.log('---hint: Encrypting...');
  console.log('---hint: Done!');
  console.log('---hint: Your account address is:');
  const encrypted = wallet.getAccount(newAcc.address);
  console.log(`${encrypted.address}`);
  console.log('---hint: here is your keyStore file:');
  console.log(`${encrypted.privateKey}`);
}

createAndEncrypt();

```