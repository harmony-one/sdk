> **[@harmony-js/contract](../README.md)**

[AbiItem](abiitem.md) /

# Class: AbiItem

## Hierarchy

* **AbiItem**

## Index

### Constructors

* [constructor](abiitem.md#constructor)

### Properties

* [abiItem](abiitem.md#abiitem)
* [anonymous](abiitem.md#anonymous)
* [contractMethodParameters](abiitem.md#contractmethodparameters)
* [inputs](abiitem.md#optional-inputs)
* [name](abiitem.md#name)
* [outputs](abiitem.md#optional-outputs)
* [payable](abiitem.md#payable)
* [signature](abiitem.md#signature)
* [type](abiitem.md#optional-type)

### Methods

* [getIndexedInputs](abiitem.md#getindexedinputs)
* [getInputLength](abiitem.md#getinputlength)
* [getInputs](abiitem.md#getinputs)
* [getOutputs](abiitem.md#getoutputs)
* [isOfType](abiitem.md#isoftype)

## Constructors

###  constructor

\+ **new AbiItem**(`abiItem`: [AbiItemModel](../interfaces/abiitemmodel.md) | any): *[AbiItem](abiitem.md)*

*Defined in [models/AbiItemModel.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`abiItem` | [AbiItemModel](../interfaces/abiitemmodel.md) \| any |

**Returns:** *[AbiItem](abiitem.md)*

## Properties

###  abiItem

• **abiItem**: *[AbiItemModel](../interfaces/abiitemmodel.md)*

*Defined in [models/AbiItemModel.ts:5](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L5)*

___

###  anonymous

• **anonymous**: *boolean*

*Defined in [models/AbiItemModel.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L9)*

___

###  contractMethodParameters

• **contractMethodParameters**: *any[]*

*Defined in [models/AbiItemModel.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L13)*

___

### `Optional` inputs

• **inputs**? : *[AbiInput](../interfaces/abiinput.md)[]*

*Defined in [models/AbiItemModel.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L11)*

___

###  name

• **name**: *string*

*Defined in [models/AbiItemModel.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L7)*

___

### `Optional` outputs

• **outputs**? : *[AbiOutput](../interfaces/abioutput.md)[]*

*Defined in [models/AbiItemModel.ts:12](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L12)*

___

###  payable

• **payable**: *boolean*

*Defined in [models/AbiItemModel.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L8)*

___

###  signature

• **signature**: *string*

*Defined in [models/AbiItemModel.ts:6](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L6)*

___

### `Optional` type

• **type**? : *undefined | string*

*Defined in [models/AbiItemModel.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L10)*

## Methods

###  getIndexedInputs

▸ **getIndexedInputs**(): *[AbiInput](../interfaces/abiinput.md)[]*

*Defined in [models/AbiItemModel.ts:52](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L52)*

**Returns:** *[AbiInput](../interfaces/abiinput.md)[]*

___

###  getInputLength

▸ **getInputLength**(): *number*

*Defined in [models/AbiItemModel.ts:28](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L28)*

**Returns:** *number*

___

###  getInputs

▸ **getInputs**(): *[AbiInput](../interfaces/abiinput.md)[]*

*Defined in [models/AbiItemModel.ts:36](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L36)*

**Returns:** *[AbiInput](../interfaces/abiinput.md)[]*

___

###  getOutputs

▸ **getOutputs**(): *[AbiOutput](../interfaces/abioutput.md)[]*

*Defined in [models/AbiItemModel.ts:44](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L44)*

**Returns:** *[AbiOutput](../interfaces/abioutput.md)[]*

___

###  isOfType

▸ **isOfType**(`type`: string): *boolean*

*Defined in [models/AbiItemModel.ts:58](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/models/AbiItemModel.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *boolean*