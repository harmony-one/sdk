/** 
## About This Package

`@harmony-js/account` is dealing with account related features.

Developers can use this package to:
- Create `Account` instance
- Create `Wallet` instance
- Sign `Transaction`
- Convert address format
- Manage `privateKey` or `mnemonic phrases` and do the `encrypt` and `decrypt` job

There are 2 main classes in this package, `Account` and `Wallet`.

- The `Account` class is basic instance that contains most features mentioned above.
- The `Wallet` class is class that stores all `Account` instance, you can do CRUD on it.


## Usage of Account

### Dependencies
  - @harmony-js/network
  - @harmony-js/staking
  - @harmony-js/transaction
  - @harmony-js/utils

### Examples

Create a random account
```javascript
    // import the Account class
    import {Account} from '@harmony-js/account'

    // Messenger is optional, by default, we have a defaultMessenger 
    // If you like to change, you will import related package here.
    import { HttpProvider, Messenger } from '@harmony-js/network';
    import { ChainType, ChainID } from '@harmony-js/utils';

    // create a custom messenger
    const customMessenger = new Messenger(
        new HttpProvider('http://localhost:9500'),
        ChainType.Harmony, // if you are connected to Harmony's blockchain
        ChainID.HmyLocal, // check if the chainId is correct
    )

    // to create an Account with random privateKey
    // and you can setMessenger later
    const randomAccount = new Account()
    randomAccount.setMessenger(customMessenger)

    // or you can set messenger on `new`
    const randomAccountWithCustomMessenger = new Account(undefined, customMessenger)

    // you can display the account
    console.log({randomAccount,randomAccountWithCustomMessenger})

    // or you can use static method to create an Account
    const staticCreatedAccount = Account.new()
    // but you have to set messenger manually after
    staticCreatedAccount.setMessenger(customMessenger)

    console.log({staticCreatedAccount})
```

### Import an existing privateKey to create Account

```typescript

    // import the Account class
    import {Account} from '@harmony-js/account'

    // NOTED: Key with or without `0x` are accepted, makes no different
    // NOTED: DO NOT import `mnemonic phrase` using `Account` class, use `Wallet` instead
    const myPrivateKey = '0xe19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930'

    const myAccountWithMyPrivateKey = new Account(myPrivateKey)

    // you can also import privateKey use static method
    const myAccountWithMyPrivateKeyUsingStatic = Account.add(myPrivateKey)

    console.log({ myAccountWithMyPrivateKey, myAccountWithMyPrivateKeyUsingStatic })

```

### Encrypt/Export keyStore file, Decrypt/Import keyStore file 

```typescript

    // import the Account class
    import {Account} from '@harmony-js/account'
    
    // suppose we have an account
    const myPrivateKey = '0xe19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930'
    const myAccountWithMyPrivateKey = new Account(myPrivateKey)

    // suppose we have a password, and we want to encrypt the account above
    const myStrongPassword = '123'

    async function encryptAndDecrypt(password) {
        // we get the privateKey before encrypted as comparison
        const unencryptedPrivateKey = myAccountWithMyPrivateKey.privateKey

        // export the account to keyStore string, which will make the privateKey encrpyted
        const keyStoreFile = await myAccountWithMyPrivateKey.toFile(password)
        // exported keyStoreFile
        console.log({ keyStoreFile })
        // see if the account is encrypted
        console.log(`Is this account encrypted? \n ${myAccountWithMyPrivateKey.encrypted}`)
        // keystore file should be equal to encrypted privateKey
        console.log(
            `Is privateKey equal to keyStore string? \n ${keyStoreFile ===
            myAccountWithMyPrivateKey.privateKey}`,
        )
    }

    encryptAndDecrypt(myStrongPassword)


    // suppose we have keyStorefile, in this example, we just use same password and keystore string encrypted above
    const someKeyStoreFile =
    '{"version":3,"id":"62326332-3139-4839-b534-656134623066","address":"1fe3da351d9fc0c4f02de5412ad7def8aee956c5","Crypto":{"ciphertext":"b86ab81682c9f5a35738ad9bd38cd9b46c1b852ef33f16dd83068f79e20d5531","cipherparams":{"iv":"44efb5a514f34968e92cafad80566487"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"d70ae1f311601562113f98c8ebe382f52a332dca1588886e5ea91e2f8a647134","n":8192,"r":8,"p":1,"dklen":32},"mac":"7b63e4e31a75a22b7091291bb58302655b738539ef3e30b30a7a7f170f6163ef"}}'

    async function importKeyStoreFileAndDecrypt(keyStoreFile, password) {
        // import keyStore string and provide the password, remember to make a new Account first
        const importedAccount = await Account.new().fromFile(keyStoreFile, password)
        // the account should decypted which `Account.encrypted` is false
        console.log(`Is this account encrypted? \n ${importedAccount.encrypted}`)
        // see if the privatekey is equal to unencrypted one?
        console.log(
            `Is the account recovered from keystore? \n ${importedAccount.privateKey === myPrivateKey}`,
        )
    }

    importKeyStoreFileAndDecrypt(someKeyStoreFile, myStrongPassword)
    

```


### Address format getter

```typescript

    // import the Account class
    import {Account} from '@harmony-js/account'
    
    // suppose we have an account
    const myPrivateKey = '0xe19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930'
    const myAccountWithMyPrivateKey = new Account(myPrivateKey)

    // Account.address is bytes20/base16 address
    console.log(myAccountWithMyPrivateKey.address)
    // Account.bech32Address is bech32 format address, in Harmony, it's `one1` prefixed
    console.log(myAccountWithMyPrivateKey.bech32Address)
    // Account.bech32TestNetAddress is bech32 format address, in Harmony, it's `tone1` prefixed, used in testnet
    console.log(myAccountWithMyPrivateKey.bech32TestNetAddress)
    // Account.checksumAddress is checksumed address from base16
    console.log(myAccountWithMyPrivateKey.checksumAddress)

```


### Sign a transaction

```typescript

    // import the Account class
    import {Account} from '@harmony-js/account'

    // import Transaction class from '@harmony-js/transaction'
    import {Transaction} from '@harmony-js/transaction'
    
     // Messenger is optional, by default, we have a defaultMessenger 
    // If you like to change, you will import related package here.
    import { HttpProvider, Messenger } from '@harmony-js/network';
    import { ChainType, ChainID, Unit } from '@harmony-js/utils';

    // create a custom messenger
    const customMessenger = new Messenger(
        new HttpProvider('http://localhost:9500'),
        ChainType.Harmony, // if you are connected to Harmony's blockchain
        ChainID.HmyLocal, // check if the chainId is correct
    )
    // suppose we have an account
    const myPrivateKey = '0xe19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930'
    const myAccountWithMyPrivateKey = new Account(myPrivateKey)

    
    const txnObject = {
        //  token send to
        to: 'one166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
        // amount to send
        value: '1000000000000000000000',
        // gas limit, you can use string or use BN value
        gasLimit: '210000',
        // send token from shardID
        shardID: 0,
        // send token to toShardID
        toShardID: 0,
        // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
        gasPrice: new Unit('100').asGwei().toWei(),
        // if you set nonce manually here, and remember, the `updateNonce` of `Account.signTransaction` should be set to false
        nonce: 0,
    };

    const txn = new Transaction(txnObject, customMessenger);

    async function signTheTxn() {
        // Account.signTransaction(transaction: Transaction, updateNonce?: boolean, encodeMode?: string, blockNumber?: string): Promise<Transaction>
        // If the 2nd parameter `updateNonce` is set to true, it will query and update account's nonce before it signs
        const signedTxn = await myAccountWithMyPrivateKey.signTransaction(txn, false, 'rlp', 'latest');

        // see if the transaction is signed
        console.log(`\n see if transaction is signed: \n ${signedTxn.isSigned()} \n`);

        // get the tranaction bytes
        console.log(`\n the signed bytes is: \n ${signedTxn.getRawTransaction()} \n`);

        return signTheTxn;
    }

    signTheTxn();
```


## Usage of Wallet

### Dependencies
  - @harmony-js/crypto
  - @harmony-js/network
  - @harmony-js/staking
  - @harmony-js/transaction
  - @harmony-js/utils

```typescript
    // constructor
    const { Wallet } = require('@harmony-js/account');
    const wallet = new Wallet(customMessenger);

    // get signer
    const wallet = new Wallet(customMessenger);
    const key_1 = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
    console.log(wallet.addByPrivateKey(key_1));
    console.log(wallet.signer)

    // createAccount
    console.log(wallet.accounts);
    wallet.createAccount();
    wallet.createAccount();
    console.log(wallet.accounts);

    // encryptAccount
    const key_1 = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
    wallet.addByPrivateKey(key_1);
    wallet.encryptAccount('one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7', '12345').then((value) => {
      console.log(value);
    })

    // decrptAccount
    const key_1 = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
    wallet.addByPrivateKey(key_1);
    wallet.encryptAccount('one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7', '12345').then(() => {
      wallet.decryptAccount('one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7', '12345').then((value) => {
        console.log(value);
      })
    });
```
 * 
 * @packageDocumentation
 * @module harmony-account
 */

/**@ignore */
export interface README {}
