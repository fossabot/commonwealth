/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { ICuratedProjectFactory } from "../ICuratedProjectFactory";

export class ICuratedProjectFactory__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICuratedProjectFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ICuratedProjectFactory;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "projectIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
        name: "newProject",
=======
        name: "projectAddress",
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
        type: "address",
      },
    ],
    name: "ProjectCreated",
    type: "event",
  },
  {
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
=======
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAddr",
        type: "address",
      },
    ],
    name: "ProjectImplChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "oldFee",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "newFee",
        type: "uint8",
      },
    ],
    name: "ProtocolFeeChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAddr",
        type: "address",
      },
    ],
    name: "ProtocolFeeToChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAddr",
        type: "address",
      },
    ],
    name: "ProtocolTokenImplChange",
    type: "event",
  },
  {
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
    ],
    name: "addAcceptedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_name",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_ipfsHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
        name: "_cwUrl",
        type: "bytes32",
      },
      {
        internalType: "address payable",
=======
        name: "_url",
        type: "bytes32",
      },
      {
        internalType: "address",
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
        name: "_beneficiary",
        type: "address",
      },
      {
        internalType: "address",
        name: "_acceptedToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_threshold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_curatorFee",
        type: "uint256",
      },
    ],
    name: "createProject",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "isAcceptedToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numProjects",
    outputs: [
      {
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
        internalType: "uint256",
        name: "",
        type: "uint256",
=======
        internalType: "uint32",
        name: "",
        type: "uint32",
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "projectImp",
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
        internalType: "uint32",
        name: "projectIndex",
        type: "uint32",
      },
    ],
    name: "projects",
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
    name: "protocolData",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "fee",
            type: "uint8",
          },
          {
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
            internalType: "address payable",
=======
            internalType: "address",
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
            name: "feeTo",
            type: "address",
          },
        ],
        internalType: "struct DataTypes.ProtocolData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
        name: "_cwToken",
        type: "address",
      },
    ],
    name: "setCWTokenImpl",
=======
        name: "_cmnProjTokenImpl",
        type: "address",
      },
    ],
    name: "setCmnProjTokenImpl",
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
        internalType: "address payable",
=======
        internalType: "address",
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
        name: "_feeTo",
        type: "address",
      },
    ],
    name: "setFeeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_projectImpl",
        type: "address",
      },
    ],
    name: "setProjectImpl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
<<<<<<< HEAD:shared/eth/types/factories/ICuratedProjectFactory__factory.ts
        internalType: "uint256",
        name: "_protocolFee",
        type: "uint256",
=======
        internalType: "uint8",
        name: "_protocolFee",
        type: "uint8",
>>>>>>> master:packages/chain-events/src/contractTypes/factories/ICuratedProjectFactory__factory.ts
      },
    ],
    name: "setProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
