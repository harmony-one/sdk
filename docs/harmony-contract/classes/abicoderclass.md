> **[@harmony-js/contract](../README.md)**

[AbiCoderClass](abicoderclass.md) /

# Class: AbiCoderClass

## Hierarchy

* **AbiCoderClass**

## Index

### Constructors

* [constructor](abicoderclass.md#constructor)

### Properties

* [coder](abicoderclass.md#coder)

### Methods

* [decodeLog](abicoderclass.md#decodelog)
* [decodeParameter](abicoderclass.md#decodeparameter)
* [decodeParameters](abicoderclass.md#decodeparameters)
* [encodeEventSignature](abicoderclass.md#encodeeventsignature)
* [encodeFunctionCall](abicoderclass.md#encodefunctioncall)
* [encodeFunctionSignature](abicoderclass.md#encodefunctionsignature)
* [encodeParameter](abicoderclass.md#encodeparameter)
* [encodeParameters](abicoderclass.md#encodeparameters)
* [isStaticType](abicoderclass.md#isstatictype)

## Constructors

###  constructor

\+ **new AbiCoderClass**(`coder`: `ABICoder`): *[AbiCoderClass](abicoderclass.md)*

*Defined in [abi/api.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`coder` | `ABICoder` |

**Returns:** *[AbiCoderClass](abicoderclass.md)*

## Properties

###  coder

• **coder**: *`ABICoder`*

*Defined in [abi/api.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L7)*

## Methods

###  decodeLog

▸ **decodeLog**(`inputs`: any, `data`: string, `topics`: any): *any*

*Defined in [abi/api.ts:85](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L85)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`inputs` | any | - |
`data` | string | "" |
`topics` | any | - |

**Returns:** *any*

___

###  decodeParameter

▸ **decodeParameter**(`type`: [ParamType](../interfaces/paramtype.md), `bytes`: `Arrayish`): *any*

*Defined in [abi/api.ts:37](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [ParamType](../interfaces/paramtype.md) |
`bytes` | `Arrayish` |

**Returns:** *any*

___

###  decodeParameters

▸ **decodeParameters**(`outputs`: [ParamType](../interfaces/paramtype.md)[], `bytes`: `Arrayish`): *any*

*Defined in [abi/api.ts:40](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`outputs` | [ParamType](../interfaces/paramtype.md)[] |
`bytes` | `Arrayish` |

**Returns:** *any*

___

###  encodeEventSignature

▸ **encodeEventSignature**(`functionName`: any): *string*

*Defined in [abi/api.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`functionName` | any |

**Returns:** *string*

___

###  encodeFunctionCall

▸ **encodeFunctionCall**(`jsonInterface`: any, `params`: any[]): *string*

*Defined in [abi/api.ts:31](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`jsonInterface` | any |
`params` | any[] |

**Returns:** *string*

___

###  encodeFunctionSignature

▸ **encodeFunctionSignature**(`functionName`: any): *string*

*Defined in [abi/api.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`functionName` | any |

**Returns:** *string*

___

###  encodeParameter

▸ **encodeParameter**(`types`: string | [ParamType](../interfaces/paramtype.md), `param`: any): *string*

*Defined in [abi/api.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | string \| [ParamType](../interfaces/paramtype.md) |
`param` | any |

**Returns:** *string*

___

###  encodeParameters

▸ **encodeParameters**(`types`: `Array<string | ParamType>`, `params`: any[]): *string*

*Defined in [abi/api.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | `Array<string \| ParamType>` |
`params` | any[] |

**Returns:** *string*

___

###  isStaticType

▸ **isStaticType**(`type`: any): *boolean*

*Defined in [abi/api.ts:135](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/abi/api.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | any |

**Returns:** *boolean*