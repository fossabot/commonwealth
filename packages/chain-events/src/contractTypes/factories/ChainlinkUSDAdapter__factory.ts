/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { ChainlinkUSDAdapter } from "../ChainlinkUSDAdapter";

export class ChainlinkUSDAdapter__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _asset: string,
    _aggregator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ChainlinkUSDAdapter> {
    return super.deploy(
      _asset,
      _aggregator,
      overrides || {}
    ) as Promise<ChainlinkUSDAdapter>;
  }
  getDeployTransaction(
    _asset: string,
    _aggregator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_asset, _aggregator, overrides || {});
  }
  attach(address: string): ChainlinkUSDAdapter {
    return super.attach(address) as ChainlinkUSDAdapter;
  }
  connect(signer: Signer): ChainlinkUSDAdapter__factory {
    return super.connect(signer) as ChainlinkUSDAdapter__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainlinkUSDAdapter {
    return new Contract(address, _abi, signerOrProvider) as ChainlinkUSDAdapter;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aggregator",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "PriceUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "aggregator",
    outputs: [
      {
        internalType: "contract IChainlinkV3Aggregator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPriceInUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewPriceInUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516103a73803806103a783398101604081905261002f916100b8565b6001600160a01b03811661007e5760405162461bcd60e51b815260206004820152601260248201527134b73b30b634b21030b3b3b932b3b0ba37b960711b604482015260640160405180910390fd5b6001600160601b0319606092831b8116608052911b1660a0526100ea565b80516001600160a01b03811681146100b357600080fd5b919050565b600080604083850312156100ca578182fd5b6100d38361009c565b91506100e16020840161009c565b90509250929050565b60805160601c60a05160601c610287610120600039600081816056015260df015260008181609a015261018401526102876000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063245a7bfc1461005157806338d52e0f14610095578063e1aa6036146100bc578063f55fa17f146100d2575b600080fd5b6100787f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6100787f000000000000000000000000000000000000000000000000000000000000000081565b6100c46100da565b60405190815260200161008c565b6000546100c4565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b15801561013657600080fd5b505afa15801561014a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016e9190610202565b5050506000819055604080516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152602081018390529194508493507f0d86730737b142fc160892fa8a0f2db687a92a0e294d1ad70624cf5acef03b8492500160405180910390a15090565b805169ffffffffffffffffffff811681146101fd57600080fd5b919050565b600080600080600060a08688031215610219578081fd5b610222866101e3565b9450602086015193506040860151925060608601519150610245608087016101e3565b9050929550929590935056fea2646970667358221220aac541c1f61ba763d250d346aa56ee35ce9d72ea39e595f5c39089c9f8b305cc64736f6c63430008040033";
