const { Harmony } = require('@harmony/core');
const ganache = require('ganache-cli');

var port = 18545;

var privateKey =
  '0xe19d05c5452598e24caad4a0d85a49146f7be089515c905ae6a19e8a578a6930';

var sendTo = '0xccaed3f53bd0a55db215cc58182969e59d2242fe';

var server = ganache.server({
  accounts: [{ secretKey: privateKey, balance: '0x21e19e0c9bab2400000' }],
  default_balance_ether: 10000,
});

server.listen(port, function(err, blockchain) {
  const harmony = new Harmony(`http://localhost:${port}`, 1);

  const acc = harmony.wallet.addByPrivateKey(privateKey);

  // // console.log(acc.address);

  // acc.getBalance().then((c) => {
  //   console.log(c);
  // });
  const txn = harmony.transactions.newTx({
    nonce: 1,
    to: sendTo,
    value: 1,
    gasLimit: new harmony.utils.Unit('21000').asWei().toWei(),
    gasPrice: new harmony.utils.Unit('100000000000').asWei().toWei(),
  });

  // console.log(blockchain);
  acc.signTransaction(txn, true).then((signed) => {
    // console.log(signed.txPayload);

    harmony.
  });

  // console.log(harmony.messenger.setRPCPrefix('eth_getPPP'));
});
