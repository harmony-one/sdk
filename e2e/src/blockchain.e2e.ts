import {harmony} from './harmony';

import demoAccounts from '../fixtures/testAccount.json';

const bc = harmony.blockchain;

const testAccount = demoAccounts.Accounts[1];

describe('e2e test blockchain', () => {
  // net_*
  it('should test net_peerCount', async () => {
    const peerCount = await bc.net_peerCount();
    expect(harmony.utils.isHex(peerCount.result)).toEqual(true);
  });

  it('should test net_version', async () => {
    const netVersion = await bc.net_version();
    const versionNumber = parseInt(netVersion.result as string, 10);
    expect(netVersion.result).toEqual(`${versionNumber}`);
  });
  it('should test hmy_protocolVersion', async () => {
    const protocolVersion = await bc.getProtocolVersion();
    expect(harmony.utils.isHex(protocolVersion.result)).toEqual(true);
  });

  // block chain info
  it('should test hmy_blockNumber', async () => {
    const res = await bc.getBlockNumber();
    expect(res.responseType).toEqual('raw');
    expect(harmony.utils.isHex(res.result)).toEqual(true);
  });
  it('should test hmy_getBlockByNumber', async () => {
    const res = await bc.getBlockByNumber({blockNumber: 'latest'});
    const size = res.result.size;
    expect(res.responseType).toEqual('raw');
    expect(harmony.utils.isHex(size)).toEqual(true);
    expect(checkBlockData(res.result)).toEqual(true);
    const res2 = await bc.getBlockByNumber({blockNumber: res.result.number});
    expect(res2.responseType).toEqual('raw');
    expect(harmony.utils.isHex(res2.result.size)).toEqual(true);
    expect(checkBlockData(res2.result)).toEqual(true);
    const res3 = await bc.getBlockByNumber({returnObject: true});
    expect(res3.responseType).toEqual('raw');
    expect(checkBlockData(res3.result)).toEqual(true);
  });

  it('should test hmy_getBlockByHash', async () => {
    const latestBlock = await bc.getBlockByNumber({blockNumber: 'latest'});
    const res = await bc.getBlockByHash({blockHash: latestBlock.result.hash});
    expect(res.responseType).toEqual('raw');
    expect(latestBlock.result.hash).toEqual(res.result.hash);
    expect(harmony.utils.isHex(res.result.size)).toEqual(true);
    expect(checkBlockData(res.result)).toEqual(true);
  });

  // account related
  it('should test hmy_getBalance', async () => {
    const balance = await bc.getBalance({address: testAccount.Address});
    expect(harmony.utils.isHex(balance.result)).toEqual(true);
  });
});

function checkBlockData(data: any) {
  return harmony.utils.validateArgs(
    data,
    {
      difficulty: [harmony.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      extraData: [(data: any) => data === '0x' || harmony.utils.isHex(data)],
      gasLimit: [harmony.utils.isHex],
      gasUsed: [harmony.utils.isHex],
      hash: [harmony.utils.isHash],
      logsBloom: [harmony.utils.isHex],
      miner: [harmony.utils.isAddress],
      mixHash: [harmony.utils.isHash],
      nonce: [harmony.utils.isNumber],
      number: [harmony.utils.isHex],
      parentHash: [harmony.utils.isHash],
      receiptsRoot: [harmony.utils.isHash],
      size: [harmony.utils.isHex],
      stateRoot: [harmony.utils.isHash],
      timestamp: [harmony.utils.isHex],
      transactionsRoot: [harmony.utils.isHash],
      uncles: [harmony.utils.isArray],
    },
    {transactions: [harmony.utils.isArray]},
  );
}
