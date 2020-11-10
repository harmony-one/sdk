/** 
# @harmony-js/account

This package provides a collection of apis to create accounts and wallets and sign using them. A wallet can hold multiple accounts and account is associated with a unique `one` address. This package also provides facilies to manage account keys.

## Installation

```
npm install @harmony-js/account
```

## Usage

Creating new account and display hex and bech32 (one) addresses 
```javascript
const account = new Account(); // or const account = Account.new()
console.log(account.checksumAddress);
console.log(account.bech32Address);
```

Creating new account using private key
```javascript
const account = Account.add('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');
```

Creating account using private key and custom messenger
```javascript
* const account = new Account(
*   '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e',
*   new Messenger(
*     new HttpProvider('https://api.s0.b.hmny.io'),
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   ),
* );
```

Creating account and setting custom messenger
```javascript
// uses by default http://localhost:9500 as messenger
* const account = new Account();
* const customMessenger = new Messenger(
*     new HttpProvider('https://api.s0.b.hmny.io'),
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   );

account.setMessenger(customMessenger);
```

Storing the account data to keystore file
```javascript
* const passphrase = '';
* const account = new Account('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');
* account.toFile(passphrase).then(keystore => {
*     console.log(keystore);
* });
```

Fetching account from keystore file
```javascript
* const passphrase = '';
* const keystore = '{"version":3,"id":"33363566-3564-4264-a638-363531666335","address":"7c41e0668b551f4f902cfaec05b5bdca68b124ce","crypto":{"ciphertext":"9b09380afb742838b32d9afc0ec1a3df35dbd7a41e3a160d08c07a4d0e79b855","cipherparams":{"iv":"1cd0e0522260eef055b9170f4825f4a0"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"bf35e36c45cccefcef73a4c900f41c682c94c28630d94d2d1f764760d245f30b","n":8192,"r":8,"p":1,"dklen":32},"mac":"25b4442972356bea02af57eba3b87803086d90b5e7657a57b528b89b1aa25f2f"}}';
* const account = new Account();
* account.fromFile(keystore, passphrase).then(account => {
*     console.log(account.bech32Address);
* });
```

Get the account balance
```javascript
* const account = new Account(
*   '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e',
*   new Messenger(
*     new HttpProvider('https://api.s0.b.hmny.io'),
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   ),
* );
* account.getBalance().then(response => {
*     console.log(response);
* });
```
outputs `{ balance: '9126943763247054940484', nonce: 45, shardID: 0 }`

Create a transaction and account, and sign it
```javascript
* const account = new Account(
*   '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e',
*   new Messenger(
*     new HttpProvider('https://api.s0.b.hmny.io'),
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   ),
* );
* const { TransactionFactory } = require('@harmony-js/transaction');
* const { Unit } = require('@harmony-js/utils');
* const factory = new TransactionFactory();

* const txn = factory.newTx({
*   to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
*   value: new Unit(1).asOne().toWei(),
*   // gas limit, you can use string
*   gasLimit: '21000',
*   // send token from shardID
*   shardID: 0,
*   // send token to toShardID
*   toShardID: 0,
*   // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
*   gasPrice: new Unit('1').asGwei().toWei(),
* });

* account.signTransaction(txn).then((signedTxn) => {
*   console.log(signedTxn);
* });
```

Similarily staking transactions can be created and signed using account.

A wallet represents user wallet that can hold one or more user accounts.

Creating an empty wallet
```javascript
* const { Wallet } = require('@harmony-js/account')
* const wallet = new Wallet();
```

Setting a messenger to be used to send wallet transactions
```javascript
* wallet.setMessenger(
*   new Messenger(
*     new HttpProvider('https://api.s0.b.hmny.io'),
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   ),
* );
```

Create an empty wallet with messenger
```javascript
* const wallet = new Wallet(
*   new Messenger(
*     new HttpProvider('https://api.s0.b.hmny.io'),
*     ChainType.Harmony,
*     ChainID.HmyTestnet,
*   ),
* );
```

An account could be added to a wallet using different ways. Adding account using mnemonics
```javascript
const mnemonics = 'horse distance dry brother pretty manual chicken mushroom town swim prize clutch';
const account = wallet.addByMnemonic(mnemonics);
```

Adding account using private key
```javascript
const account = wallet.addByPrivateKey('0x676cd9773dd23a4c1d7f22767c61c7b6723cc6be37b078545f6e0e91433a23dd')
```

Adding account using keystore file
```javascript
* const keystore = '{"version":3,"id":"33363566-3564-4264-a638-363531666335","address":"7c41e0668b551f4f902cfaec05b5bdca68b124ce","crypto":{"ciphertext":"9b09380afb742838b32d9afc0ec1a3df35dbd7a41e3a160d08c07a4d0e79b855","cipherparams":{"iv":"1cd0e0522260eef055b9170f4825f4a0"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"bf35e36c45cccefcef73a4c900f41c682c94c28630d94d2d1f764760d245f30b","n":8192,"r":8,"p":1,"dklen":32},"mac":"25b4442972356bea02af57eba3b87803086d90b5e7657a57b528b89b1aa25f2f"}}';
* const passphrase = '';
* wallet.addByKeyStore(keystore, passphrase).then(account => {
*     console.log(account.bech32Address);
* });
```

Creating a new account using passphrase
```javascript
* const passphrase = 'harmony-one';
* wallet.createAccount(passphrase).then(account => {
*     console.log(account.bech32Address);
* });
```

Get all accounts in the wallet
```javascript
* wallet.accounts.forEach(addr => {
*     const account = wallet.getAccount(addr);
*     console.log(account.bech32Address);
* });
```

Set wallet signer when multiple accounts exists in the wallet
```javascript
wallet.setSigner(signerAddr);
```

Sign transaction using wallet, will sign the transaction using the wallet signer
```javascript
* const txn = factory.newTx({
*   to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
*   value: new Unit(1).asOne().toWei(),
*   // gas limit, you can use string
*   gasLimit: '21000',
*   // send token from shardID
*   shardID: 0,
*   // send token to toShardID
*   toShardID: 0,
*   // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
*   gasPrice: new Unit('1').asGwei().toWei(),
* });

* wallet.signTransaction(txn).then((signedTxn) => {
*   console.log(signedTxn);
* });
```

Similarily staking transactions can be signed using `signStaking` api.
 * 
 * @packageDocumentation
 * @module harmony-account
 */

/**@ignore */
export interface README {}
