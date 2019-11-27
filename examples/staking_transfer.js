const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const {
  Description,
  Decimal,
  CommissionRate,
  StakingTransaction,
  CreateValidator,
} = require('@harmony-js/staking'); //../packages/harmony-staking
const { TxStatus } = require('@harmony-js/transaction');

const LOCALNET = `http://localhost:9500`;

// 1. initialize the Harmony instance

const harmony = new Harmony(
  // rpc url
  LOCALNET,
  {
    // chainType set to Harmony
    chainType: ChainType.Harmony,
    // chainType set to HmyLocal
    chainId: ChainID.HmyLocal,
  },
);

// 2. get wallet ready

// one1a2rhuaqjcvfu69met9sque2l3w5v9z6qcdcz65
// surge welcome lion goose gate consider taste injury health march debris kick

// add privateKey to wallet
const private = 'fd416cb87dcf8ed187e85545d7734a192fc8e976f5b540e9e21e896ec2bc25c3';
const sender = harmony.wallet.addByPrivateKey(private);
// const phrase =
//     'genius cable radar memory high catch blossom correct middle wish gentle
//     fiscal';

// one1a2rhuaqjcvfu69met9sque2l3w5v9z6qcdcz65
// surge welcome lion goose gate consider taste injury health march debris kick

// add privateKey to wallet
// const sender = harmony.wallet.addByMnemonic(phrase);

const stakingTxn = harmony.stakings
  .createValidator({
    validatorAddress: 'one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy',
    description: {
      name: 'Alice',
      identity: 'alice',
      website: 'alice.harmony.one',
      securityContact: 'Bob',
      details: "Don't mess with me!!",
    },
    commissionRate: { rate: '0.1', maxRate: '0.9', maxChangeRate: '0.05' },
    minSelfDelegation: '0x8AC7230489E80000',
    maxTotalDelegation: '0xA2A15D09519BE00000',
    slotPubKeys: [
      '0xb9486167ab9087ab818dc4ce026edb5bf216863364c32e42df2af03c5ced1ad181e7d12f0e6dd5307a73b62247608611',
    ],
    amount: '0x56BC75E2D63100000',
  })
  .setTxParams({
    nonce: '0x2',
    gasPrice: '0x',
    gasLimit: '0x0927c0',
    chainId: ChainID.HmyLocal,
  })
  .build();

// 3. get sharding info
async function setSharding() {
  // Harmony is a sharded blockchain, each endpoint have sharding structure,
  // However sharding structure is different between mainnet, testnet and local
  // testnet We need to get sharding info before doing cross-shard transaction
  const res = await harmony.blockchain.getShardingStructure();
  harmony.shardingStructures(res.result);
}

async function execute() {
  await setSharding();

  const signedTxn = await harmony.wallet.signStaking(stakingTxn);
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

  // console.log(signedTxn);

  const [sentTxn, txnHash] = await signedTxn.sendTransaction();
  // signedTxn
  //   .sendTransaction()
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // to confirm the result if it is already there
  console.log(txnHash);
  console.log(sentTxn);

  const confiremdTxn = await sentTxn.confirm(txnHash);

  // if the transactino is cross-shard transaction
  // if (!confiremdTxn.isCrossShard()) {
  if (confiremdTxn.isConfirmed()) {
    console.log('--- Result ---');
    console.log('');
    console.log('Staking transaction');
    console.log(`${txnHash} is confirmed`);
    console.log('');
    process.exit();
  }
  // }
  // if (confiremdTxn.isConfirmed() && confiremdTxn.isCxConfirmed()) {
  //   console.log('--- Result ---');
  //   console.log('');
  //   console.log('Cross-Shard transaction');
  //   console.log(`${txnHash} is confirmed`);
  //   console.log('');
  //   process.exit();
  // }
}
execute();
//   const delegateMsg = Delegate({
//     delegatorAddress: 'one1a0x3d6xpmr6f8wsyaxd9v36pytvp48zckswvv9',
//     validatorAddress: 'one1a0x3d6xpmr6f8wsyaxd9v36pytvp48zckswvv9',
//     amount: '0xa',
//   });

//   const stakingTxn = StakingTransaction({
//     directive: '0x2',
//     stakeMsg: delegateMsg,
//     nonce: '0x2',
//     gasPrice: '0x',
//     gasLimit: '0x64',
//     chainId: 0,
//     from: 'one1a0x3d6xpmr6f8wsyaxd9v36pytvp48zckswvv9',
//   });

//   stakingTxn
//     .sendTransaction()
//     .then((stakingTxn, res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
