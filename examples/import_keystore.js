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

// encryptAndDecrypt(myStrongPassword)

// suppose we have keyStorefile, in this example, we just use same password and keystore string encrypted above
const someKeyStoreFile =
  '{"address":"1cc87010760602a576455d6d2f03a3bf92d2c2ca","crypto":{"cipher":"aes-128-ctr","ciphertext":"8bc4575478cae488a0f6d1b33ac72e61e0a04ce650aa7d03de26cfe6f6b0dce1","cipherparams":{"iv":"3bf838a3c67a4cbd6e02158f1ccd49d7"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"c8c5374b1ce08b25b7d5733f8d072396af6f93f4bf65c06efd29a7155c62883c"},"mac":"a9ad452817814e71a2af5571add57ee0d944d7ab63bf3a5cfaf66af53bb8b9b6"},"id":"ab8e578b-9431-47f6-9937-6f1f18e8f34f","version":3}';
//'{"version":3,"id":"62326332-3139-4839-b534-656134623066","address":"1fe3da351d9fc0c4f02de5412ad7def8aee956c5","crypto":{"ciphertext":"b86ab81682c9f5a35738ad9bd38cd9b46c1b852ef33f16dd83068f79e20d5531","cipherparams":{"iv":"44efb5a514f34968e92cafad80566487"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"salt":"d70ae1f311601562113f98c8ebe382f52a332dca1588886e5ea91e2f8a647134","n":8192,"r":8,"p":1,"dklen":32},"mac":"7b63e4e31a75a22b7091291bb58302655b738539ef3e30b30a7a7f170f6163ef"}}'

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
