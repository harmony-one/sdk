// import the Account class
const { Account } = require('@harmony-js/account');

// suppose we have an account
const myPrivateKey = '0x831f0b3ff835d5ec4602878742fda25591b6d3bb2731366621ac83a05216bec8';
const myAccountWithMyPrivateKey = new Account(myPrivateKey);

// suppose we have a password, and we want to encrypt the account above
const myStrongPassword = '123';

async function encryptAndDecrypt(password) {
  // we get the privateKey before encrypted as comparison
  const unencryptedPrivateKey = myAccountWithMyPrivateKey.privateKey;

  // export the account to keyStore string, which will make the privateKey encrpyted
  const keyStoreFile = await myAccountWithMyPrivateKey.toFile(password);
  // exported keyStoreFile
  console.log({ keyStoreFile });
  // see if the account is encrypted
  console.log(`Is this account encrypted? \n ${myAccountWithMyPrivateKey.encrypted}`);
  // keystore file should be equal to encrypted privateKey
  console.log(
    `Is privateKey equal to keyStore string? \n ${keyStoreFile ===
      myAccountWithMyPrivateKey.privateKey}`,
  );
}

encryptAndDecrypt(myStrongPassword);

// suppose we have keyStorefile, in this example, we just use same password and keystore string encrypted above
const someKeyStoreFile =
  '{"version":3,"id":"38326265-6165-4961-a338-353063643962","address":"1cc87010760602a576455d6d2f03a3bf92d2c2ca","crypto":{"ciphertext":"a4ee9120b27ba66fb9d3fabd6372fa3a11060cf439a6a1777ced1e6253de8c29","cipherparams":{"iv":"c18772a882ac461fffd1971e9ec57861"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"da4efedeca407279be65e02fc94b7c4b7c74c3396447c71e659c74a73a5d9131","n":8192,"r":8,"p":1,"dklen":32},"mac":"547ee6616dcdf424273c113ceb00728ccdda17ff6449f2cb84a1a8352c87b4e6"}}';

async function importKeyStoreFileAndDecrypt(keyStoreFile, password) {
  // import keyStore string and provide the password, remember to make a new Account first
  const importedAccount = await Account.new().fromFile(keyStoreFile, password);
  // the account should decypted which `Account.encrypted` is false
  console.log(`Is this account encrypted? \n ${importedAccount.encrypted}`);
  // see if the privatekey is equal to unencrypted one?
  console.log(
    `Is the account recovered from keystore? \n ${importedAccount.privateKey === myPrivateKey}`,
  );
}

importKeyStoreFileAndDecrypt(someKeyStoreFile, myStrongPassword);
