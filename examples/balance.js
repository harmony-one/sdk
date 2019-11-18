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

harmony.blockchain
  .getBalance({
    address: `one1vjywuur8ckddmc4dsyx6qdgf590eu07ag9fg4a`,
  })
  .then((res) => {
    console.log(new harmony.utils.Unit(res.result).asWei().toEther());
  })
  .catch((err) => {
    console.log(err);
  });
