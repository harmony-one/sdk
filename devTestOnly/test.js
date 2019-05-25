const { Harmony } = require('../packages/harmony-core/dist');
const { SubscriptionMethod } = require('../packages/harmony-network/dist');
const { ChainType, ChainID } = require('../packages/harmony-utils/dist');

const Settings = {
  Ropsten: {
    http: 'https://ropsten.infura.io/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    ws: 'wss://ropsten.infura.io/ws/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    type: ChainType.Ethereum,
    id: ChainID.Ropsten,
  },
  Rinkeby: {
    http: 'https://rinkeby.infura.io/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    ws: 'wss://rinkeby.infura.io/ws/v3/4f3be7f5bbe644b7a8d95c151c8f52ec',
    type: ChainType.Ethereum,
    id: ChainID.Ropsten,
  },
  Ganache: {
    http: 'http://localhost:18545',
    ws: 'ws://localhost:18545',
    type: ChainType.Ethereum,
    id: ChainID.Ganache,
  },
};

// a function that will map the setting to harmony class constructor inputs
function useSetting(setting, providerType) {
  return [setting[providerType], setting.type, setting.id];
}

const harmony = new Harmony(...useSetting(Settings.Ropsten, 'ws'));

// import our preset mnes
const mne =
  'food response winner warfare indicate visual hundred toilet jealous okay relief tornado';

// now we have the mnes added to wallet
const acc1 = harmony.wallet.addByMnemonic(mne, 0);

acc1.getBalance().then((res) => {
  console.log(`-- hint: account balance of ${acc1.address}`);
  console.log(``);
  console.log({ account: res });
  console.log(``);
  console.log(``);
});

const logSub = harmony.blockchain.logs({
  address: '0x8320fe7702b96808f7bbc0d4a888ed1468216cfd',
  topics: [
    '0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902',
  ],
  fromBlock: '0x0',
});

logSub
  .onData((res) => {
    console.log({ res });
  })
  .onError((error) => {
    console.log({ error });
  });
