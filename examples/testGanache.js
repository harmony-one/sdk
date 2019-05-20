const { Harmony } = require('../packages/harmony-core/dist');
const { ChainID, ChainType } = require('../packages/harmony-utils/dist');
const {
  SubscribeBlockTracker,
  SubscriptionMethod,
} = require('../packages/harmony-network/dist');

const ganache = require('ganache-cli');

const port = 18545;

const url = `http://localhost:${port}`;

const wsUrl = `ws://localhost:${port}`;

const mne =
  'food response winner warfare indicate visual hundred toilet jealous okay relief tornado';

console.log('--- hint: please write these down');
console.log('-------------------------------------');
console.log(`${mne}`);
console.log('-------------------------------------');

// we use ChainType=0 to indicate we are using `harmony node`
// if we set it to 1, we use `eth` as our settings.
// here 1 is used, which means we use ethereum-node.

console.log(ChainType);

const harmony = new Harmony(wsUrl, ChainType.Ethereum, ChainID.Geth);

const wsHarmony = new Harmony(wsUrl, ChainType.Ethereum, ChainID.Geth);

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
  gasLimit: '0x3000000',
  allowUnlimitedContractSize: true,
});

// now it is async time

async function main() {
  const password = '1234567890123';

  await createAndEncrypt(mne, 10, password);

  // harmony.blockchain.newPendingTransacitons();

  const latestBalance = await harmony.blockchain.getBalance({
    address: acc.address,
    blockNumber: 'latest',
  });
  console.log('--- testing: hmy_getBalance');
  console.log('-------------------------------------');
  console.log({ balance: harmony.utils.hexToNumber(latestBalance.result) });
  console.log('-------------------------------------');

  const nonce = await harmony.blockchain.getTransactionCount({
    address: harmony.wallet.signer.address,
    blockNumber: 'latest',
  });
  console.log('--- testing: hmy_getTransactionCount');
  console.log('-------------------------------------');
  console.log({
    nonce: Number.parseInt(harmony.utils.hexToNumber(nonce.result), 10),
  });
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
  console.log({ latestBlockHash: latestBlock.result.hash });
  console.log('-------------------------------------');

  const sameLatestBlock = await harmony.blockchain.getBlockByHash({
    blockHash: latestBlock.result.hash,
  });
  console.log('--- testing: hmy_getBlockByHash');
  console.log('-------------------------------------');
  console.log({ sameLatestBlockNumber: sameLatestBlock.result.number });
  console.log('-------------------------------------');

  const blockTransactionCount = await harmony.blockchain.getBlockTransactionCountByHash(
    {
      blockHash: latestBlock.result.hash,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByHash');
  console.log('-------------------------------------');
  console.log(blockTransactionCount.result);
  console.log('-------------------------------------');

  const sameBlockTransactionCount = await harmony.blockchain.getBlockTransactionCountByNumber(
    {
      blockNumber: latestBlock.result.number,
    },
  );
  console.log('--- testing: hmy_getBlockTransactionCountByNumber');
  console.log('-------------------------------------');
  console.log(sameBlockTransactionCount.result);
  console.log('-------------------------------------');

  const transaction = await harmony.blockchain.getTransactionByBlockHashAndIndex(
    {
      blockHash: latestBlock.result.hash,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockHashAndIndex');
  console.log('-------------------------------------');
  console.log(transaction.result);
  console.log('-------------------------------------');

  const sameTransaction = await harmony.blockchain.getTransactionByBlockNumberAndIndex(
    {
      blockNumber: latestBlock.result.number,
      index: '0x0',
    },
  );
  console.log('--- testing: hmy_getTransactionByBlockNumberAndIndex');
  console.log('-------------------------------------');
  console.log({ gas: sameTransaction.result.gas });
  console.log('-------------------------------------');

  const sameTransaction2 = await harmony.blockchain.getTransactionByHash({
    txnHash: transaction.result.hash,
  });
  const { gas, gasPrice, value } = sameTransaction2.result;
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

  setTimeout(async () => {
    const txn2 = harmony.transactions.clone(txn);
    const s2 = await harmony.wallet.signTransaction(txn2, undefined, password);
    const [sentTxn, TranID] = await s2.sendTransaction();
    await sentTxn.confirm(TranID, 20, 1000);
    console.log({
      blockNumbers: sentTxn.blockNumbers,
      txStatus: sentTxn.txStatus,
    });
  }, 5000);

  setTimeout(async () => {
    const txn3 = harmony.transactions.clone(txn);
    const s3 = await harmony.wallet.signTransaction(txn3, undefined, password);
    const [sentTxn, TranID] = await s3.sendTransaction();
    await sentTxn.confirm(TranID, 20, 1000);
    console.log({
      blockNumbers: sentTxn.blockNumbers,
      txStatus: sentTxn.txStatus,
    });
  }, 10000);
  setTimeout(async () => {
    const txns3 = harmony.transactions.clone(txn);
    const s3 = await harmony.wallet.signTransaction(txns3, undefined, password);
    const [sentTxn, TranID] = await s3.sendTransaction();
    await sentTxn.confirm(TranID, 20, 1000);
    console.log({
      blockNumbers: sentTxn.blockNumbers,
      txStatus: sentTxn.txStatus,
    });
  }, 15000);
  setTimeout(async () => {
    const txn4 = harmony.transactions.clone(txn);
    const s4 = await harmony.wallet.signTransaction(txn4, undefined, password);
    const [sentTxn, TranID] = await s4.sendTransaction();
    await sentTxn.confirm(TranID, 20, 1000);
    console.log({
      blockNumbers: sentTxn.blockNumbers,
      txStatus: sentTxn.txStatus,
    });
  }, 20000);
  setTimeout(async () => {
    const txn5 = harmony.transactions.clone(txn);
    const s5 = await harmony.wallet.signTransaction(txn5, undefined, password);
    const [sentTxn, TranID] = await s5.sendTransaction();
    await sentTxn.confirm(TranID, 20, 1000);
    console.log({
      blockNumbers: sentTxn.blockNumbers,
      txStatus: sentTxn.txStatus,
    });
  }, 25000);
  setTimeout(async () => {
    const txn6 = harmony.transactions.clone(txn);
    const s6 = await harmony.wallet.signTransaction(txn6, undefined, password);
    const [sentTxn, TranID] = await s6.sendTransaction();
    await sentTxn.confirm(TranID, 20, 1000);
    console.log({
      blockNumbers: sentTxn.blockNumbers,
      txStatus: sentTxn.txStatus,
    });
  }, 30000);
}

server.listen(port, function(err, blockchain) {
  // harmony.blockchain.newPendingTransactions().then((p) => {
  //   p.onData(async (res) => {
  //     const txn = await harmony.blockchain.getTransactionByHash({
  //       txnHash: res.params.result,
  //     });
  //     console.log({ res, txn });
  //   });
  // });
  // const newPending = new SubscriptionMethod(
  //   ['newPendingTransactions'],
  //   harmony.messenger,
  // );
  // newPending.onData(async (res) => {
  //   const txn = await harmony.blockchain.getTransactionByHash({
  //     txnHash: res.params.result,
  //   });
  //   console.log({ res, txn });
  // });
  // const newHeads = new SubscriptionMethod(['newHeads'], harmony.messenger);
  // newHeads.onData((res) => {
  //   console.log(res.params.result.number);
  // });

  main();
});
