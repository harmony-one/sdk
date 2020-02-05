/**
 * @packageDocumentation
 * @module harmony-utils
 * @ignore
 */

// import BN from 'bn.js';

export const basicType = {
  zero: 0,
  float: 0.1,
  text: 'testString',
  jsonString: '{"name":"@harmony-js/utils","version":"0.0.48","description":"utils for harmony"}',
  hexNumber: 0x123,
  hexString: '0x123',
  bool: true,
  undefined,
  null: null,
  // tslint:disable-next-line: no-empty
  function: () => {},
  array: [1, 2, 3],
  object: {},
};

export const advanceType = {
  privateKey: '0x97d2d3a21d829800eeb01aa7f244926f993a1427d9ba79d9dc3bf14fe04d9e37',
  publicKey: '0x028fe48b60c4511f31cf58906ddaa8422725d9313d4b994fab598d2cf220146228',
  address: '0x84fece7d1f5629bc728c956ffd313dd0c3ac8f17',
  hexAddress: '0x84fece7d1f5629bc728c956ffd313dd0c3ac8f17',
  checkSumAddress: '0x84fece7d1f5629Bc728c956Ffd313dD0C3AC8f17',
  hex: '0x8423',
  hash: 'F5A5FD42D16A20302798EF6ED309979B43003D2320D9F0E8EA9831A92759FB4B',
  byStrX: '0x84fece7d1f5629bc728c956ffd313dd0c3ac8f17',
  url: 'https://www.zilliqa.com',
};
