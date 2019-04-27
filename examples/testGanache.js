const { Harmony } = require('@harmony/core');
const ganache = require('ganache-cli');

var port = 18545;

const url = `http://localhost:${port}`;

const mne =
  'food response winner warfare indicate visual hundred toilet jealous okay relief tornado';

console.log('--- hint: please write these down');
console.log('-------------------------------------');
console.log(`${mne}`);
console.log('-------------------------------------');

// we use ChainType=0 to indicate we are using `harmony node`
// if we set it to 1, we use `eth` as our settings.
// here 1 is used, which means we use ethereum-node.

const harmony = new Harmony(url, 1);

async function createAndEncrypt(words, index, password) {
  for (let i = 0; i < index; i++) {
    const newAcc = harmony.wallet.addByMnemonic(words, i);
    await harmony.wallet.encryptAccount(newAcc.address, password);
  }
}

const acc = harmony.wallet.addByMnemonic(mne, 0);

console.log('--- hint: we use this private key to test with ganache');
console.log('-------------------------------------');
console.log(`${acc.privateKey}`);
console.log('-------------------------------------');

const server = ganache.server({
  accounts: [{ secretKey: acc.privateKey, balance: '0x21e19e0c9bab2400000' }],
  default_balance_ether: 10000,
});

// now it is async time

async function main() {
  const password = '1234567890123';

  await createAndEncrypt(mne, 10, password);

  const latestBalance = await harmony.blockchain.getBalance({
    address: acc.address,
    blockNumber: 'latest',
  });
  console.log('--- testing: hmy_getBalance');
  console.log('-------------------------------------');
  console.log({ balance: harmony.utils.hexToNumber(latestBalance) });
  console.log('-------------------------------------');

  const nonce = await harmony.blockchain.getTransactionCount({
    address: harmony.wallet.signer.address,
    blockNumber: 'latest',
  });
  console.log('--- testing: hmy_getTransactionCount');
  console.log('-------------------------------------');
  console.log({ nonce: Number.parseInt(harmony.utils.hexToNumber(nonce), 10) });
  console.log('-------------------------------------');

  const balanceOfAccount = await harmony.wallet.signer.getBalance();
  console.log('--- testing: Account.getBalance');
  console.log('-------------------------------------');
  console.log(balanceOfAccount);
  console.log('-------------------------------------');

  const sendTo = '0xccaed3f53bd0a55db215cc58182969e59d2242fe';

  const txn = harmony.transactions.newTx({
    to: sendTo,
    value: new harmony.utils.Unit('1234567').asWei().toWei(),
    gasLimit: new harmony.utils.Unit('21000').asWei().toWei(),
    gasPrice: new harmony.utils.Unit('100000000000').asWei().toWei(),
  });

  // now we sign and send a transaction

  const signed = await harmony.wallet.signTransaction(txn, undefined, password);

  console.log('--- testing: Account.signTransaction');
  console.log('-------------------------------------');
  console.log({ signedTransactionPayload: signed.txPayload });
  console.log('-------------------------------------');

  const [sentTxn, TranID] = await signed.sendTransaction();

  console.log('--- testing: Transaction.sendTransaction');
  console.log('-------------------------------------');
  console.log({ TranID });
  console.log('-------------------------------------');

  const confirmed = await sentTxn.confirm(TranID, 20, 1000);

  console.log('--- testing: Transaction.confirm');
  console.log('-------------------------------------');
  console.log({
    confirmed: confirmed.isConfirmed(),
    receipt: confirmed.receipt,
  });
  console.log('-------------------------------------');

  const latestBlock = await harmony.blockchain.getBlockByNumber({
    blockNumber: 'latest',
  });
  console.log('--- testing: hmy_getBlockByNumber');
  console.log('-------------------------------------');
  console.log({ latestBlockHash: latestBlock.hash });
  console.log('-------------------------------------');

  const sameLatestBlock = await harmony.blockchain.getBlockByHash({
    blockHash: latestBlock.hash,
  });
  console.log('--- testing: hmy_getBlockByHash');
  console.log('-------------------------------------');
  console.log({ sameLatestBlockNumber: sameLatestBlock.number });
  console.log('-------------------------------------');

  const blockTransactionCount = await harmony.blockchain.getBlockTransactionCountByHash(
    {
      blockHash: latestBlock.hash,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByHash');
  console.log('-------------------------------------');
  console.log(blockTransactionCount);
  console.log('-------------------------------------');

  const sameBlockTransactionCount = await harmony.blockchain.getBlockTransactionCountByNumber(
    {
      blockNumber: latestBlock.number,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByNumber');
  console.log('-------------------------------------');
  console.log(sameBlockTransactionCount);
  console.log('-------------------------------------');

  const transaction = await harmony.blockchain.getTransactionByBlockHashAndIndex(
    {
      blockHash: latestBlock.hash,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockHashAndIndex');
  console.log('-------------------------------------');
  console.log(transaction);
  console.log('-------------------------------------');

  const sameTransaction = await harmony.blockchain.getTransactionByBlockNumberAndIndex(
    {
      blockNumber: latestBlock.number,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockNumberAndIndex');
  console.log('-------------------------------------');
  console.log({ gas: sameTransaction.gas });
  console.log('-------------------------------------');

  const sameTransaction2 = await harmony.blockchain.getTransactionByHash({
    txnHash: transaction.hash,
  });
  const { gas, gasPrice, value } = sameTransaction2;
  const valueBN = harmony.utils.hexToBN(value);
  const gasBN = harmony.utils.hexToBN(gas);
  const gasPriceBN = harmony.utils.hexToBN(gasPrice);
  const actualCost = new harmony.utils.Unit(gasBN.mul(gasPriceBN).add(valueBN))
    .asWei()
    .toWei();
  console.log('--- testing: hmy_getTransactionByHash');
  console.log('-------------------------------------');
  console.log({
    actualCost: actualCost.toString(),
    gas: harmony.utils.hexToNumber(gas),
    gasPrice: gasPriceBN.toString(),
    value: valueBN.toString(),
    comment: 'actualCost= gas * gasPrice + value',
  });
  console.log('-------------------------------------');

  const getBalanceAgainObject = await harmony.wallet.signer.getBalance();
  console.log('--- testing: get balance again');
  console.log('-------------------------------------');
  console.log(getBalanceAgainObject);
  console.log('-------------------------------------');
}

server.listen(port, function(err, blockchain) {
  main();
});
