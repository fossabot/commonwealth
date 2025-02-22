/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { PriceOracleAggregator } from "../PriceOracleAggregator";

export class PriceOracleAggregator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PriceOracleAggregator> {
    return super.deploy(
      _admin,
      overrides || {}
    ) as Promise<PriceOracleAggregator>;
  }
  getDeployTransaction(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_admin, overrides || {});
  }
  attach(address: string): PriceOracleAggregator {
    return super.attach(address) as PriceOracleAggregator;
  }
  connect(signer: Signer): PriceOracleAggregator__factory {
    return super.connect(signer) as PriceOracleAggregator__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceOracleAggregator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PriceOracleAggregator;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
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
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IOracle",
        name: "oracle",
        type: "address",
      },
    ],
    name: "UpdateOracle",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "assetToOracle",
    outputs: [
      {
        internalType: "contract IOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "getPriceInUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "contract IOracle",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "updateOracleForAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
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
  "0x60a060405234801561001057600080fd5b5060405161053a38038061053a83398101604081905261002f9161008e565b6001600160a01b0381166100795760405162461bcd60e51b815260206004820152600d60248201526c24a72b20a624a22fa0a226a4a760991b604482015260640160405180910390fd5b60601b6001600160601b0319166080526100bc565b60006020828403121561009f578081fd5b81516001600160a01b03811681146100b5578182fd5b9392505050565b60805160601c61045a6100e06000396000818160f001526101ec015261045a6000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063022661471461005c5780632e00d245146100825780635df52114146100c3578063eb9d14a9146100d8578063f851a440146100eb575b600080fd5b61006f61006a366004610371565b610112565b6040519081526020015b60405180910390f35b6100ab610090366004610371565b6000602081905290815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610079565b6100d66100d1366004610394565b6101e1565b005b61006f6100e6366004610371565b6102d5565b6100ab7f000000000000000000000000000000000000000000000000000000000000000081565b6001600160a01b038181166000908152602081905260408120549091166101545760405162461bcd60e51b815260040161014b906103e4565b60405180910390fd5b6001600160a01b038083166000908152602081815260408083205481516370d5301b60e11b8152915194169363e1aa603693600480840194938390030190829087803b1580156101a357600080fd5b505af11580156101b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101db91906103cc565b92915050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146102465760405162461bcd60e51b815260206004820152600a60248201526927a7262cafa0a226a4a760b11b604482015260640161014b565b6001600160a01b03811661026c5760405162461bcd60e51b815260040161014b906103e4565b6001600160a01b038281166000818152602081815260409182902080546001600160a01b031916948616948517905581519283528201929092527fb1d1442dba579887e297ac433e5716c847abf2dc052ee9de4869b7b1b8f6206d910160405180910390a15050565b6001600160a01b0381811660009081526020819052604081205490911661030e5760405162461bcd60e51b815260040161014b906103e4565b6001600160a01b038083166000908152602081815260409182902054825163f55fa17f60e01b8152925193169263f55fa17f926004808201939291829003018186803b15801561035d57600080fd5b505afa1580156101b7573d6000803e3d6000fd5b600060208284031215610382578081fd5b813561038d8161040c565b9392505050565b600080604083850312156103a6578081fd5b82356103b18161040c565b915060208301356103c18161040c565b809150509250929050565b6000602082840312156103dd578081fd5b5051919050565b6020808252600e908201526d494e56414c49445f4f5241434c4560901b604082015260600190565b6001600160a01b038116811461042157600080fd5b5056fea264697066735822122054bcb3e5905f78a6c8168044c20a4643b883a4a7571d3794f2ecb2b9fb06dfbe64736f6c63430008040033";
