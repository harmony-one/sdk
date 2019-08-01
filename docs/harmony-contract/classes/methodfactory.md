> **[@harmony-js/contract](../README.md)**

[MethodFactory](methodfactory.md) /

# Class: MethodFactory

## Hierarchy

* **MethodFactory**

## Index

### Constructors

* [constructor](methodfactory.md#constructor)

### Properties

* [abiCoder](methodfactory.md#abicoder)
* [abiModel](methodfactory.md#abimodel)
* [contract](methodfactory.md#contract)
* [methodKeys](methodfactory.md#private-methodkeys)

### Methods

* [addMethodsToContract](methodfactory.md#addmethodstocontract)
* [mapMethodKeys](methodfactory.md#private-mapmethodkeys)

## Constructors

###  constructor

\+ **new MethodFactory**(`contract`: [Contract](contract.md)): *[MethodFactory](methodfactory.md)*

*Defined in [methods/methodFactory.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/methods/methodFactory.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`contract` | [Contract](contract.md) |

**Returns:** *[MethodFactory](methodfactory.md)*

## Properties

###  abiCoder

• **abiCoder**: *[AbiCoderClass](abicoderclass.md)*

*Defined in [methods/methodFactory.ts:9](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/methods/methodFactory.ts#L9)*

___

###  abiModel

• **abiModel**: *any | [AbiModel](abimodel.md)*

*Defined in [methods/methodFactory.ts:8](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/methods/methodFactory.ts#L8)*

___

###  contract

• **contract**: *[Contract](contract.md)*

*Defined in [methods/methodFactory.ts:7](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/methods/methodFactory.ts#L7)*

___

### `Private` methodKeys

• **methodKeys**: *string[]*

*Defined in [methods/methodFactory.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/methods/methodFactory.ts#L10)*

## Methods

###  addMethodsToContract

▸ **addMethodsToContract**(): *[Contract](contract.md)*

*Defined in [methods/methodFactory.ts:20](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/methods/methodFactory.ts#L20)*

**Returns:** *[Contract](contract.md)*

___

### `Private` mapMethodKeys

▸ **mapMethodKeys**(): *string[]*

*Defined in [methods/methodFactory.ts:39](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/methods/methodFactory.ts#L39)*

**`function`** mapMethodKeys

**Returns:** *string[]*

{description}