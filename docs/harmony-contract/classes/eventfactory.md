> **[@harmony-js/contract](../README.md)**

[EventFactory](eventfactory.md) /

# Class: EventFactory

## Hierarchy

* **EventFactory**

## Index

### Constructors

* [constructor](eventfactory.md#constructor)

### Properties

* [abiCoder](eventfactory.md#abicoder)
* [abiModel](eventfactory.md#abimodel)
* [contract](eventfactory.md#contract)
* [eventKeys](eventfactory.md#private-eventkeys)

### Methods

* [addEventsToContract](eventfactory.md#addeventstocontract)
* [map](eventfactory.md#private-map)
* [mapEventKeys](eventfactory.md#private-mapeventkeys)

## Constructors

###  constructor

\+ **new EventFactory**(`contract`: [Contract](contract.md)): *[EventFactory](eventfactory.md)*

*Defined in [events/eventFactory.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`contract` | [Contract](contract.md) |

**Returns:** *[EventFactory](eventfactory.md)*

## Properties

###  abiCoder

• **abiCoder**: *[AbiCoderClass](abicoderclass.md)*

*Defined in [events/eventFactory.ts:12](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L12)*

___

###  abiModel

• **abiModel**: *any | [AbiModel](abimodel.md)*

*Defined in [events/eventFactory.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L11)*

___

###  contract

• **contract**: *[Contract](contract.md)*

*Defined in [events/eventFactory.ts:10](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L10)*

___

### `Private` eventKeys

• **eventKeys**: *string[]*

*Defined in [events/eventFactory.ts:13](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L13)*

## Methods

###  addEventsToContract

▸ **addEventsToContract**(): *[Contract](contract.md)*

*Defined in [events/eventFactory.ts:23](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L23)*

**Returns:** *[Contract](contract.md)*

___

### `Private` map

▸ **map**(`abiItemModel`: [AbiItemModel](../interfaces/abiitemmodel.md), `contract`: [Contract](contract.md), `options`: any): *any*

*Defined in [events/eventFactory.ts:46](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`abiItemModel` | [AbiItemModel](../interfaces/abiitemmodel.md) |
`contract` | [Contract](contract.md) |
`options` | any |

**Returns:** *any*

___

### `Private` mapEventKeys

▸ **mapEventKeys**(): *string[]*

*Defined in [events/eventFactory.ts:42](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/events/eventFactory.ts#L42)*

**`function`** mapMethodKeys

**Returns:** *string[]*

{description}