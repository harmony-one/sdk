> **[@harmony-js/contract](../README.md)**

[ContractFactory](contractfactory.md) /

# Class: ContractFactory

## Hierarchy

* **ContractFactory**

## Index

### Constructors

* [constructor](contractfactory.md#constructor)

### Properties

* [wallet](contractfactory.md#wallet)

### Methods

* [createContract](contractfactory.md#createcontract)

## Constructors

###  constructor

\+ **new ContractFactory**(`wallet`: `Wallet`): *[ContractFactory](contractfactory.md)*

*Defined in [contractFactory.ts:6](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contractFactory.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`wallet` | `Wallet` |

**Returns:** *[ContractFactory](contractfactory.md)*

## Properties

###  wallet

• **wallet**: *`Wallet`*

*Defined in [contractFactory.ts:6](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contractFactory.ts#L6)*

## Methods

###  createContract

▸ **createContract**(`abi`: any[], `address?`: undefined | string, `options?`: [ContractOptions](../interfaces/contractoptions.md)): *[Contract](contract.md)*

*Defined in [contractFactory.ts:11](https://github.com/harmony-one/sdk/blob/3ec028a/packages/harmony-contract/src/contractFactory.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`abi` | any[] |
`address?` | undefined \| string |
`options?` | [ContractOptions](../interfaces/contractoptions.md) |

**Returns:** *[Contract](contract.md)*