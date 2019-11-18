// import or require Harmony class
const { Harmony } = require('@harmony-js/core');

// import or require settings
const { ChainID, ChainType } = require('@harmony-js/utils');

const URL_TESTNET = `https://api.s0.b.hmny.io`;
const URL_MAINNET = `https://api.s0.t.hmny.io`;

// 1. initialize the Harmony instance

const harmony = new Harmony(
  // rpc url
  URL_TESTNET,
  {
    // chainType set to Harmony
    chainType: ChainType.Harmony,
    // chainType set to HmyLocal
    chainId: ChainID.HmyTestnet,
  },
);

// 2. get wallet ready
// specify the privateKey
// const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
const phrase = 'genius cable radar memory high catch blossom correct middle wish gentle fiscal';
// add privateKey to wallet
const sender = harmony.wallet.addByMnemonic(phrase);

// 3. get sharding info
async function setSharding() {
  // Harmony is a sharded blockchain, each endpoint have sharding structure,
  // However sharding structure is different between mainnet, testnet and local testnet
  // We need to get sharding info before doing cross-shard transaction
  const res = await harmony.blockchain.getShardingStructure();
  harmony.shardingStructures(res.result);
}

// 4. get transaction payload ready

async function transfer(receiver) {
  // run set sharding first, if you want to make a cross-shard transaction
  await setSharding();

  const txn = harmony.transactions.newTx({
    //  token send to
    to: receiver,
    // amount to send
    value: '1000000000',
    // gas limit, you can use string
    gasLimit: '210000',
    // send token from shardID
    shardID: 0,
    // send token to toShardID
    toShardID: 0,
    // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
    gasPrice: new harmony.utils.Unit('100').asGwei().toWei(),
  });

  // sign the transaction use wallet;

  const signedTxn = await harmony.wallet.signTransaction(txn);

  // Now you can use `Transaction.observed()` to listen events

  signedTxn
    .observed()
    .on('transactionHash', (txnHash) => {
      console.log('');
      console.log('--- hash ---');
      console.log('');
      console.log(txnHash);
      console.log('');
    })
    .on('receipt', (receipt) => {
      console.log('');
      console.log('--- receipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('cxReceipt', (receipt) => {
      console.log('');
      console.log('--- cxReceipt ---');
      console.log('');
      console.log(receipt);
      console.log('');
    })
    .on('error', (error) => {
      console.log('');
      console.log('--- error ---');
      console.log('');
      console.log(error);
      console.log('');
    });

  // send the txn, get [Transaction, transactionHash] as result

  const [sentTxn, txnHash] = await signedTxn.sendTransaction();

  // to confirm the result if it is already there

  const confiremdTxn = await sentTxn.confirm(txnHash);

  // if the transactino is cross-shard transaction
  if (!confiremdTxn.isCrossShard()) {
    if (confiremdTxn.isConfirmed()) {
      console.log('--- Result ---');
      console.log('');
      console.log('Normal transaction');
      console.log(`${txnHash} is confirmed`);
      console.log('');
      process.exit();
    }
  }
  if (confiremdTxn.isConfirmed() && confiremdTxn.isCxConfirmed()) {
    console.log('--- Result ---');
    console.log('');
    console.log('Cross-Shard transaction');
    console.log(`${txnHash} is confirmed`);
    console.log('');
    process.exit();
  }
}

transfer('one1a2rhuaqjcvfu69met9sque2l3w5v9z6qcdcz65');
