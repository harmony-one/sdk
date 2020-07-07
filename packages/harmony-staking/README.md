# @harmony-js/staking

This package provides a collection of apis to create, sign/send staking transaction, and receive confirm/receipt.

## Installation

```
npm install @harmony-js/staking
```

## Usage

Create a Harmony instance connecting to testnet

```javascript
const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@harmony-js/utils');

const hmy = new Harmony(
    'https://api.s0.b.hmny.io/',
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyTestnet,
    },
);
```
Below, examples show how to send delegate, undelegate, and collect rewards staking transactions. First, set the chainId, gasLimit, gasPrice for all subsequent staking transactions
```javascript
hmy.stakings.setTxParams({
  gasLimit: 25000,
  gasPrice: numberToHex(new hmy.utils.Unit('1').asGwei().toWei()),
  chainId: 2
});
```
<span style="color:red">Note: create and edit validator transactions are not fully supported in the sdk</span>

Create delegate staking transaction
```javascript
const delegate = hmy.stakings.delegate({
  delegatorAddress: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
  validatorAddress: 'one1vfqqagdzz352mtvdl69v0hw953hm993n6v26yl',
  amount: numberToHex(new Unit(1000).asOne().toWei())
});
const delegateStakingTx = delegate.build();
```

Sign and send the delegate transaction and receive confirmation
```javascript
// key corresponds to one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7, only has testnet balance
hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

hmy.wallet.signStaking(delegateStakingTx).then(signedTxn => {
  signedTxn.sendTransaction().then(([tx, hash]) => {
    console.log(hash);
    signedTxn.confirm(hash).then(response => {
      console.log(response.receipt);
    });
  });
});
```

Similarily, undelegate and collect reward transactions can be composed, signed and sent
Create undelegate staking transaction
```javascript
const undelegate = hmy.stakings.undelegate({
  delegatorAddress: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
  validatorAddress: 'one1vfqqagdzz352mtvdl69v0hw953hm993n6v26yl',
  amount: numberToHex(new Unit(1000).asOne().toWei())
});
const undelegateStakingTx = undelegate.build();
```

Create collect rewards staking transaction
```javascript
const collectRewards = hmy.stakings.collectRewards({
  delegatorAddress: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
});
const collectRewardsStakingTx = collectRewards.build();
```

Also, similar to normal transaction, signing and sending can be performed asynchronously.