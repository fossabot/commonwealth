export { EthereumSessionController } from "./ethereum";
export { SubstrateSessionController } from "./substrate";
export { CosmosSDKSessionController } from "./cosmos";
export { SolanaSessionController } from "./solana";
export { NEARSessionController } from "./near";

import type { Action, Session, SessionPayload, ActionArgument } from "@canvas-js/interfaces"

export abstract class ISessionController {
  abstract getAddress(chainId: string): string | null;
  abstract getOrCreateAddress(chainId: string): Promise<string>;

  abstract hasAuthenticatedSession(chainId: string): boolean;
  abstract authSession(chainId: string, sessionPayload: SessionPayload, signature: string): void;

  abstract sign(chainId: string, call: string, args: Record<string, ActionArgument>): Promise<{
    session: Session,
    action: Action,
    hash: string,
  }>;
}
