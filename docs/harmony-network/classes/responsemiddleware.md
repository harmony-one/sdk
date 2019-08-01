> **[@harmony-js/network](../README.md)**

[ResponseMiddleware](responsemiddleware.md) /

# Class: ResponseMiddleware

**`class`** ResponseMiddleware

**`description`** Response middleware of RPC

**`param`** response from rpc

**`returns`** response middleware instance

## Hierarchy

* **ResponseMiddleware**

## Index

### Constructors

* [constructor](responsemiddleware.md#constructor)

### Properties

* [error](responsemiddleware.md#error)
* [raw](responsemiddleware.md#raw)
* [responseType](responsemiddleware.md#responsetype)
* [result](responsemiddleware.md#result)

### Accessors

* [getError](responsemiddleware.md#geterror)
* [getRaw](responsemiddleware.md#getraw)
* [getResult](responsemiddleware.md#getresult)

### Methods

* [getResponseType](responsemiddleware.md#getresponsetype)
* [isError](responsemiddleware.md#iserror)
* [isRaw](responsemiddleware.md#israw)
* [isResult](responsemiddleware.md#isresult)

## Constructors

###  constructor

\+ **new ResponseMiddleware**(`ResponseBody`: [RPCResponseBody](../interfaces/rpcresponsebody.md)‹*any*, *any*›): *[ResponseMiddleware](responsemiddleware.md)*

*Defined in [messenger/responseMiddleware.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`ResponseBody` | [RPCResponseBody](../interfaces/rpcresponsebody.md)‹*any*, *any*› |

**Returns:** *[ResponseMiddleware](responsemiddleware.md)*

## Properties

###  error

• **error**: *any*

*Defined in [messenger/responseMiddleware.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L11)*

___

###  raw

• **raw**: *any*

*Defined in [messenger/responseMiddleware.ts:12](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L12)*

___

###  responseType

• **responseType**: *string*

*Defined in [messenger/responseMiddleware.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L13)*

___

###  result

• **result**: *any*

*Defined in [messenger/responseMiddleware.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L10)*

## Accessors

###  getError

• **get getError**(): *any*

*Defined in [messenger/responseMiddleware.ts:27](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L27)*

**Returns:** *any*

___

###  getRaw

• **get getRaw**(): *any*

*Defined in [messenger/responseMiddleware.ts:33](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L33)*

**Returns:** *any*

___

###  getResult

• **get getResult**(): *any*

*Defined in [messenger/responseMiddleware.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L21)*

**Returns:** *any*

## Methods

###  getResponseType

▸ **getResponseType**(): *string*

*Defined in [messenger/responseMiddleware.ts:37](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L37)*

**Returns:** *string*

___

###  isError

▸ **isError**(): *boolean*

*Defined in [messenger/responseMiddleware.ts:50](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L50)*

**Returns:** *boolean*

___

###  isRaw

▸ **isRaw**(): *boolean*

*Defined in [messenger/responseMiddleware.ts:56](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L56)*

**Returns:** *boolean*

___

###  isResult

▸ **isResult**(): *boolean*

*Defined in [messenger/responseMiddleware.ts:53](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-network/src/messenger/responseMiddleware.ts#L53)*

**Returns:** *boolean*