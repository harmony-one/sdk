> **[@harmony-js/contract](../README.md)**

[AbiItemModel](abiitemmodel.md) /

# Interface: AbiItemModel

## Hierarchy

* **AbiItemModel**

## Index

### Properties

* [anonymous](abiitemmodel.md#anonymous)
* [constant](abiitemmodel.md#optional-constant)
* [contractMethodParameters](abiitemmodel.md#contractmethodparameters)
* [funcName](abiitemmodel.md#funcname)
* [inputs](abiitemmodel.md#inputs)
* [name](abiitemmodel.md#name)
* [outputs](abiitemmodel.md#outputs)
* [payable](abiitemmodel.md#payable)
* [signature](abiitemmodel.md#signature)
* [stateMutability](abiitemmodel.md#optional-statemutability)
* [type](abiitemmodel.md#type)

### Methods

* [getIndexedInputs](abiitemmodel.md#getindexedinputs)
* [getInputLength](abiitemmodel.md#getinputlength)
* [getInputs](abiitemmodel.md#getinputs)
* [getOutputs](abiitemmodel.md#getoutputs)
* [isOfType](abiitemmodel.md#isoftype)

## Properties

###  anonymous

• **anonymous**: *boolean*

*Defined in [models/types.ts:17](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L17)*

___

### `Optional` constant

• **constant**? : *undefined | false | true*

*Defined in [models/types.ts:22](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L22)*

___

###  contractMethodParameters

• **contractMethodParameters**: *any[]*

*Defined in [models/types.ts:24](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L24)*

___

###  funcName

• **funcName**: *string*

*Defined in [models/types.ts:23](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L23)*

___

###  inputs

• **inputs**: *[AbiInput](abiinput.md)[]*

*Defined in [models/types.ts:18](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L18)*

___

###  name

• **name**: *string*

*Defined in [models/types.ts:14](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L14)*

___

###  outputs

• **outputs**: *[AbiOutput](abioutput.md)[]*

*Defined in [models/types.ts:19](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L19)*

___

###  payable

• **payable**: *boolean*

*Defined in [models/types.ts:16](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L16)*

___

###  signature

• **signature**: *string*

*Defined in [models/types.ts:15](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L15)*

___

### `Optional` stateMutability

• **stateMutability**? : *undefined | string*

*Defined in [models/types.ts:21](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L21)*

___

###  type

• **type**: *string*

*Defined in [models/types.ts:20](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L20)*

## Methods

###  getIndexedInputs

▸ **getIndexedInputs**(): *[AbiInput](abiinput.md)[]*

*Defined in [models/types.ts:27](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L27)*

**Returns:** *[AbiInput](abiinput.md)[]*

___

###  getInputLength

▸ **getInputLength**(): *number*

*Defined in [models/types.ts:25](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L25)*

**Returns:** *number*

___

###  getInputs

▸ **getInputs**(): *[AbiInput](abiinput.md)[]*

*Defined in [models/types.ts:26](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L26)*

**Returns:** *[AbiInput](abiinput.md)[]*

___

###  getOutputs

▸ **getOutputs**(): *[AbiOutput](abioutput.md)[]*

*Defined in [models/types.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L28)*

**Returns:** *[AbiOutput](abioutput.md)[]*

___

###  isOfType

▸ **isOfType**(`value`: string): *boolean*

*Defined in [models/types.ts:29](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/types.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *boolean*