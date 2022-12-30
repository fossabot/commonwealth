import type { Block, Chain as CanvasChain, SessionPayload } from '@canvas-js/interfaces';
import { ChainBase } from 'common-common/src/types';

/// An object with an identifier.
export interface IIdentifiable {
  identifier: string;
}

/// An object with an identifier and a completion flag.
export interface ICompletable extends IIdentifiable {
  completed: boolean;
}

export const constructCanvasMessage = (
  chain: CanvasChain,
  chainId: number | string, // Commonwealth chainID, not Canvas chainID. Must be cast to string.
  fromAddress: string,
  sessionPublicAddress: string,
  timestamp: number,
  blockhash: string | null
): SessionPayload => {
  // This will be replaced with an IPFS hash after turning on peering
  const placeholderMultihash = '/commonwealth'; // TODO

  // Not all data here is used. For chains without block data
  // like Solana/Polkadot, timestamp is left blank in session login.
  //
  // This in cleaned up in the next PR which reconciles
  // Commonwealth to use the updated Canvas signing payload.
  const payload: SessionPayload = {
    from: fromAddress,
    spec: placeholderMultihash,
    address: sessionPublicAddress,
    duration: (86400 * 1000).toString(),
    timestamp: timestamp.toString(),
    blockhash: blockhash ?? null,
    chain: chain,
    chainId: chainId.toString(),
  };

  return payload;
}

export function chainBaseToCanvasChain(chainBase: ChainBase): CanvasChain {
  // Translate Commonwealth ChainBase names to Canvas Chain names.
  if (chainBase === ChainBase.CosmosSDK) {
    return "cosmos"
  } else if (chainBase === ChainBase.Ethereum) {
    return "eth"
  } else if (chainBase === ChainBase.NEAR) {
    return "near"
  } else if (chainBase === ChainBase.Solana) {
    return "eth"
  } else if (chainBase === ChainBase.Substrate) {
    return "substrate"
  }
}

export function chainBaseToCanvasChainId(chainBase: ChainBase, chainId: string | number): string {
  // Translate Commonwealth ChainBase/ChainNode to Canvas ChainIDs.
  if (chainBase === ChainBase.CosmosSDK) {
    return chainId.toString();
  } else if (chainBase === ChainBase.Ethereum) {
    return chainId.toString();
  } else if (chainBase === ChainBase.NEAR) {
    // Temporarily locked to mainnet, but eventually should support: mainnet, testnet, betanet, localnet
    // See also: client/scripts/views/pages/finish_near_login.tsx
    return "mainnet";
  } else if (chainBase === ChainBase.Solana) {
    // Temporarily locked to mainnet, but eventually should support: 101, 102, 103
    // See also: client/scripts/controllers/app/webWallets/phantom_web_wallet.ts
    return "101";
  } else if (chainBase === ChainBase.Substrate) {
    // Temporarily locked to edgeware, but eventually should support Substrate chains by id
    // See also: client/scripts/controllers/app/webWallets/polkadot_web_wallet.ts
    return "edgeware"; // Not well defined, should we store Substrate metadata on Chain objects?
  }
}
