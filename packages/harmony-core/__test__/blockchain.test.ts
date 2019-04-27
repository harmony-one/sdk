// tslint:disable-next-line: no-implicit-dependencies
import fetch from 'jest-fetch-mock';
import { Blockchain } from '../src/blockchain';
import { HttpProvider, Messenger } from '@harmony/network';

const provider = new HttpProvider('https://mock.com');
const messenger = new Messenger(provider);

describe('test Blockchain', () => {
  afterEach(() => {
    fetch.resetMocks();
  });
  it('should test get block methods', async () => {
    const chainType = 0;
    // test constructors
    const bc = new Blockchain(messenger);
    const bc2 = new Blockchain(messenger, chainType);
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
        hash:
          '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
        logsBloom:
          '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        miner: '0x0000000000000000000000000000000000000000',
        mixHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x0000000000000000',
        number: '0x0',
        parentHash:
          '0x057e52af22d94cd40626d1e157e3468219d8236847c13bb3aa11f31fd6c4e71a',
        receiptsRoot:
          '0xf9c8a65a3224a4c6e6ae3b9f0ee992c4cefdbe4db318c4ec52880e324f1b77bd',
        size: '0x2de9',
        stateRoot:
          '0x112322fee869910b9a0e390ae536addca7a2a82bac7c17a61ed43a715e845218',
        timestamp: 1556265598,
        transactionsRoot:
          '0x7687794ce8479d36c1a6d8b161dca37d90bd824da1c36d6d8f33f7bf4015c1d0',
        uncles: [],
      },
    };

    // set mocks to test methods
    const mocks = [];
    for (let i = 0; i < 5; i++) {
      mocks.push(mockRpcResponse);
    }

    // tslint:disable-next-line: no-shadowed-variable
    const responses = mocks.map((res) => [JSON.stringify(res)]);
    fetch.mockResponses(...responses);

    // should test getBlockByNumber
    const res = await bc.getBlockByNumber({ blockNumber: 'latest' });
    expect(res.responseType).toEqual('result');
    expect(res.size).toEqual('0x2de9');
    const res2 = await bc.getBlockByNumber({ blockNumber: '0x1' });
    expect(res2.responseType).toEqual('result');
    expect(res2.size).toEqual('0x2de9');
    const res3 = await bc.getBlockByNumber({ returnObject: true });
    expect(res3.responseType).toEqual('result');
    expect(res3.timestamp).toEqual(1556265598);

    const res4 = await bc.getBlockByHash({
      blockHash:
        '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
    });
    expect(res4.responseType).toEqual('result');
    expect(res4.size).toEqual('0x2de9');
    const res5 = await bc.getBlockByHash({
      blockHash:
        '0x7e1ef610f700805b93cf85b1e55bce84fcbd04373252a968755366a8d2215424',
      returnObject: true,
    });
    expect(res5.responseType).toEqual('result');
    expect(res5.timestamp).toEqual(1556265598);

    // try some errors
  });
});
