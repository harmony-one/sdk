/**
 * @packageDocumentation
 * @ignore
 */

// tslint:disable-next-line: no-implicit-dependencies
import fetch from 'jest-fetch-mock';
import { Blockchain } from '../src/blockchain';
import { HttpProvider, Messenger } from '@harmony-js/network';

const provider = new HttpProvider('https://mock.com');
const messenger = new Messenger(provider);

function runMocks(mockRpcResponse: any, repeat: number): void {
  const mocks = [];
  for (let i = 0; i < 5; i++) {
    mocks.push(mockRpcResponse);
  }
  // tslint:disable-next-line: no-shadowed-variable
  const responses = mocks.map((res) => [JSON.stringify(res)]);
  fetch.mockResponses(...responses);
}

describe('test Blockchain', () => {
  afterEach(() => {
    fetch.resetMocks();
  });
  it('should test get block methods', async () => {
    // test constructors
    const bc = new Blockchain(messenger);
    const bc2 = new Blockchain(messenger);
    // test setMessenger
    bc2.setMessenger(messenger);

    // mock a response
    const mockRpcResponse = {
      id: 1,
      jsonrpc: '2.0',
      result: {
        difficulty: '0x0',
        extraData: '0x',
        gasLimit: '0x254a0e6f8',
        gasUsed: '0x22da16',
        hash: '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
        logsBloom:
          '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        miner: '0x0000000000000000000000000000000000000000',
        mixHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x0000000000000000',
        number: '0x0',
        parentHash: '0x057e52af22d94cd40626d1e157e3468219d8236847c13bb3aa11f31fd6c4e71a',
        receiptsRoot: '0xf9c8a65a3224a4c6e6ae3b9f0ee992c4cefdbe4db318c4ec52880e324f1b77bd',
        size: '0x2de9',
        stateRoot: '0x112322fee869910b9a0e390ae536addca7a2a82bac7c17a61ed43a715e845218',
        timestamp: 1556265598,
        transactionsRoot: '0x7687794ce8479d36c1a6d8b161dca37d90bd824da1c36d6d8f33f7bf4015c1d0',
        uncles: [],
      },
    };

    runMocks(mockRpcResponse, 5);

    // should test getBlockByNumber
    const res = await bc.getBlockByNumber({ blockNumber: 'latest' });
    expect(res.responseType).toEqual('raw');
    expect(res.result.size).toEqual('0x2de9');
    const res2 = await bc.getBlockByNumber({ blockNumber: '0x1' });
    expect(res2.responseType).toEqual('raw');
    expect(res2.result.size).toEqual('0x2de9');
    const res3 = await bc.getBlockByNumber({ returnObject: true });
    expect(res3.responseType).toEqual('raw');
    expect(res3.result.timestamp).toEqual(1556265598);

    const res4 = await bc.getBlockByHash({
      blockHash: '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
    });
    expect(res4.responseType).toEqual('raw');
    expect(res4.result.size).toEqual('0x2de9');
    const res5 = await bc.getBlockByHash({
      blockHash: '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
      returnObject: true,
    });
    expect(res5.responseType).toEqual('raw');
    expect(res5.result.timestamp).toEqual(1556265598);

    // try some errors
  });
  it('test get transaction', async () => {
    const bc = new Blockchain(messenger);
    const mockRpcResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: {
        blockHash: '0x359036996c7ad7fdaa42b18de2fc157ae97d4cd3f32c688af349225f7e8f8fc6',
        blockNumber: '0x1',
        from: '0x15a128e599b74842bccba860311efa92991bffb5',
        gas: '0x81650',
        gasPrice: '0x0',
        hash: '0x9a71ea0839511c95b0818bd54a38ab56a05337a8282245d853d0ae3a1aedd7da',
        input:
          '0x6080604052678ac7230489e80000600155600280546001600160a01b0319163317905561014d806100316000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806327c78c421461003b5780634ddd108a14610063575b600080fd5b6100616004803603602081101561005157600080fd5b50356001600160a01b031661007d565b005b61006b61011c565b60408051918252519081900360200190f35b6002546001600160a01b0316331461009457600080fd5b600154303110156100a457600080fd5b6001600160a01b03811660009081526020819052604090205460ff16156100ca57600080fd5b6001600160a01b038116600081815260208190526040808220805460ff1916600190811790915554905181156108fc0292818181858888f19350505050158015610118573d6000803e3d6000fd5b5050565b30319056fea165627a7a72305820b83c347551d539b44b318fb7b4601a635a7d3a6d7063d11e6e05e4886b6d88050029',
        nonce: '0x0',
        to: null,
        transactionIndex: '0x0',
        value: '0x69e10de76676d08000000',
        v: '0x1b',
        r: '0xcea5384b78461b482531561a2f34198ab2cd6c6b69a1254b4029b46f783317a2',
        s: '0x3f37baa890214c9a6167846d91d6dbfdada41401cf79c3f2ad3a064eb432f3a',
      },
    };

    runMocks(mockRpcResponse, 4);

    const res1 = await bc.getTransactionByHash({
      txnHash: '0x9a71ea0839511c95b0818bd54a38ab56a05337a8282245d853d0ae3a1aedd7da',
    });
    expect(res1.responseType).toEqual('raw');
    expect(res1.result.blockHash).toEqual(
      '0x359036996c7ad7fdaa42b18de2fc157ae97d4cd3f32c688af349225f7e8f8fc6',
    );
    const res2 = await bc.getTransactionByBlockHashAndIndex({
      blockHash: '0x359036996c7ad7fdaa42b18de2fc157ae97d4cd3f32c688af349225f7e8f8fc6',
      index: '0x0',
    });
    expect(res2.responseType).toEqual('raw');
    expect(res2.result.hash).toEqual(
      '0x9a71ea0839511c95b0818bd54a38ab56a05337a8282245d853d0ae3a1aedd7da',
    );
    const res3 = await bc.getTransactionByBlockNumberAndIndex({
      blockNumber: '0x1',
      index: '0x0',
    });
    expect(res3.responseType).toEqual('raw');
    expect(res3.result.hash).toEqual(
      '0x9a71ea0839511c95b0818bd54a38ab56a05337a8282245d853d0ae3a1aedd7da',
    );
    const res4 = await bc.getTransactionByBlockNumberAndIndex({
      index: '0x0',
    });
    expect(res4.responseType).toEqual('raw');
    expect(res4.result.hash).toEqual(
      '0x9a71ea0839511c95b0818bd54a38ab56a05337a8282245d853d0ae3a1aedd7da',
    );
  });

  it('test get Block Transaction count', async () => {
    const bc = new Blockchain(messenger);
    const mockRpcResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x65',
    };
    // set mocks to test methods
    runMocks(mockRpcResponse, 5);

    const res1 = await bc.getBlockTransactionCountByHash({
      blockHash: '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
    });
    expect(res1.result).toEqual('0x65');
    try {
      await bc.getBlockTransactionCountByHash({ blockHash: 'wrong' });
    } catch (error) {
      expect(error.message).toEqual(
        `Validation failed for blockHash,should be validated by isHash`,
      );
    }
    const res2 = await bc.getBlockTransactionCountByNumber({
      blockNumber: '0x1',
    });
    try {
      await bc.getBlockTransactionCountByNumber({ blockNumber: 'wrong' });
    } catch (error) {
      expect(error.message).toEqual(
        `Validation failed for blockNumber,should be validated by isBlockNumber`,
      );
    }
    expect(res2.result).toEqual('0x65');
    const res3 = await bc.getBlockTransactionCountByNumber({
      blockNumber: 'latest',
    });
    expect(res3.result).toEqual('0x65');
    const res4 = await bc.getTransactionCount({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
      blockNumber: '0x1',
    });
    expect(res4.result).toEqual('0x65');
    const res5 = await bc.getTransactionCount({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
    });
    expect(res5.result).toEqual('0x65');
  });

  it('test get code', async () => {
    const bc = new Blockchain(messenger);
    const mockRpcResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x',
    };
    // set mocks to test methods
    runMocks(mockRpcResponse, 2);

    const res1 = await bc.getCode({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
      blockNumber: '0x1',
    });
    expect(res1.result).toEqual('0x');
    const res2 = await bc.getCode({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
    });
    expect(res2.result).toEqual('0x');
  });
  it('test get storage at', async () => {
    const bc = new Blockchain(messenger);
    const mockRpcResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x0000000000000000000000000000000000000000000000000000000000000000',
    };
    // set mocks to test methods
    runMocks(mockRpcResponse, 2);

    const res1 = await bc.getStorageAt({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
      position: '0x0',
      blockNumber: '0x1',
    });
    expect(res1.result).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
    const res2 = await bc.getStorageAt({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
      position: '0x0',
    });
    expect(res2.result).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
  });
  it('test get balance', async () => {
    const bc = new Blockchain(messenger);
    const mockRpcResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0xd3c21bcecceda1000000',
    };
    // set mocks to test methods
    runMocks(mockRpcResponse, 2);

    const res1 = await bc.getBalance({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
      blockNumber: '0x1',
    });
    expect(res1.result).toEqual('0xd3c21bcecceda1000000');
    const res2 = await bc.getBalance({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
    });
    expect(res2.result).toEqual('0xd3c21bcecceda1000000');
  });
  it('test get transaction receipt', async () => {
    const bc = new Blockchain(messenger);
    const mockRpcResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0xd3c21bcecceda1000000',
    };
    // set mocks to test methods
    runMocks(mockRpcResponse, 2);

    const res1 = await bc.getBalance({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
      blockNumber: '0x1',
    });
    expect(res1.result).toEqual('0xd3c21bcecceda1000000');
    const res2 = await bc.getBalance({
      address: '0x15a128e599b74842bccba860311efa92991bffb5',
    });
    expect(res2.result).toEqual('0xd3c21bcecceda1000000');
  });
});
