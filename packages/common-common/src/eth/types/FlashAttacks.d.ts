/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface FlashAttacksInterface extends ethers.utils.Interface {
  functions: {
    "flashProposal(uint256,address,address[],uint256[],string[],bytes[],bool[],bytes32)": FunctionFragment;
    "flashVote(uint256,uint256,bool)": FunctionFragment;
    "flashVotePermit(uint256,uint256,bool,uint8,bytes32,bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "flashProposal",
    values: [
      BigNumberish,
      string,
      string[],
      BigNumberish[],
      string[],
      BytesLike[],
      boolean[],
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "flashVote",
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "flashVotePermit",
    values: [
      BigNumberish,
      BigNumberish,
      boolean,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "flashProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "flashVote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "flashVotePermit",
    data: BytesLike
  ): Result;

  events: {};
}

export class FlashAttacks extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: FlashAttacksInterface;

  functions: {
    flashProposal(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "flashProposal(uint256,address,address[],uint256[],string[],bytes[],bool[],bytes32)"(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    flashVote(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "flashVote(uint256,uint256,bool)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    flashVotePermit(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "flashVotePermit(uint256,uint256,bool,uint8,bytes32,bytes32)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  flashProposal(
    proposalPower: BigNumberish,
    executor: string,
    targets: string[],
    values: BigNumberish[],
    signatures: string[],
    calldatas: BytesLike[],
    withDelegatecalls: boolean[],
    ipfsHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "flashProposal(uint256,address,address[],uint256[],string[],bytes[],bool[],bytes32)"(
    proposalPower: BigNumberish,
    executor: string,
    targets: string[],
    values: BigNumberish[],
    signatures: string[],
    calldatas: BytesLike[],
    withDelegatecalls: boolean[],
    ipfsHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  flashVote(
    votePower: BigNumberish,
    proposalId: BigNumberish,
    support: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "flashVote(uint256,uint256,bool)"(
    votePower: BigNumberish,
    proposalId: BigNumberish,
    support: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  flashVotePermit(
    votePower: BigNumberish,
    proposalId: BigNumberish,
    support: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "flashVotePermit(uint256,uint256,bool,uint8,bytes32,bytes32)"(
    votePower: BigNumberish,
    proposalId: BigNumberish,
    support: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    flashProposal(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "flashProposal(uint256,address,address[],uint256[],string[],bytes[],bool[],bytes32)"(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    flashVote(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "flashVote(uint256,uint256,bool)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    flashVotePermit(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "flashVotePermit(uint256,uint256,bool,uint8,bytes32,bytes32)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    flashProposal(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "flashProposal(uint256,address,address[],uint256[],string[],bytes[],bool[],bytes32)"(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    flashVote(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "flashVote(uint256,uint256,bool)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    flashVotePermit(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "flashVotePermit(uint256,uint256,bool,uint8,bytes32,bytes32)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    flashProposal(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "flashProposal(uint256,address,address[],uint256[],string[],bytes[],bool[],bytes32)"(
      proposalPower: BigNumberish,
      executor: string,
      targets: string[],
      values: BigNumberish[],
      signatures: string[],
      calldatas: BytesLike[],
      withDelegatecalls: boolean[],
      ipfsHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    flashVote(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "flashVote(uint256,uint256,bool)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    flashVotePermit(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "flashVotePermit(uint256,uint256,bool,uint8,bytes32,bytes32)"(
      votePower: BigNumberish,
      proposalId: BigNumberish,
      support: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
