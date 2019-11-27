const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const {
  StakingTransaction,
  CreateValidator,
  Delegate,
  Undelegate,
  CollectRewards,
  StakingFactory,
} = require('@harmony-js/staking');

const harmony = new Harmony('http://localhost:9500', {
  chainId: ChainID.HmyLocal,
  chainType: ChainType.Harmony,
});

const stakingTxn = harmony.stakings
  .createValidator({
    validatorAddress: 'one1a0x3d6xpmr6f8wsyaxd9v36pytvp48zckswvv9',
    description: {
      name: 'Alice',
      identity: 'alice',
      website: 'alice.harmony.one',
      securityContact: 'Bob',
      details: "Don't mess with me!!!",
    },
    commissionRate: {
      rate: '0.1',
      maxRate: '0.9',
      maxChangeRate: '0.05',
    },
    minSelfDelegation: '0xa',
    maxTotalDelegation: '0x0bb8',
    slotPubKeys: [
      '0xb9486167ab9087ab818dc4ce026edb5bf216863364c32e42df2af03c5ced1ad181e7d12f0e6dd5307a73b62247608611',
    ],
    amount: '0x64',
  })
  .setTxParams({
    nonce: '0x2',
    gasPrice: '0x',
    gasLimit: '0x64',
    chainId: 0,
  })
  .build();

stakingTxn
  .sendTransaction()
  .then(([stakingTxn, res]) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

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
