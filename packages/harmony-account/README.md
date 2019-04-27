# Features

1. [x] Account instance 
2. [x] Create Account
3. [x] Import prv key
4. [x] Import/Export keystore file
5. [x] BIP39
6. [x] BIP44
7. [WIP] Sign txn/message
8. [x] getBalance
9. [x] Wallet CRUD

# Wallet Usage

```js

import { Wallet } from '@harmony/account';

const wallet = new Wallet();

const mnes = wallet.generateMnemonic();

// add mnemonic and use index=0
const accountA = wallet.addByMnemonic(mnes,0);

// this account instance will be the wallet's signer by default
console.log(wallet.signer.address === accountA.address)
// true

wallet.encryptAccount(accountA.address,'easy password')
    .then((encrypted)=>{
        console.log(encrypted.privateKey);
        // private key now is keyStoreV3 format string

        wallet.decryptAccount(accountA.address,'easy password')
            .then((decrypted)=>{
                console.log(decrypted.privateKey);
                // now private key is recovered
            })
    });


wallet.accounts
// it will display accounts addresses live in wallet

wallet.getAccount(accountA.address);
// it will get account instance by using address as reference

wallet.removeAccount(accountA.address);
// it will remove account instance from wallet

wallet.createAccount();
// it will create a new acount instance

wallet.addByPrivateKey(key);
// you can add private key directly as well

```