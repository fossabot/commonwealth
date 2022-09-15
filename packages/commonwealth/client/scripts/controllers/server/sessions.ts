import { BlockInfo, IWebWallet } from 'models';
import { sessionSigninModal } from 'views/modals/session_signin_modal';
import { actionToHash, sessionToHash } from "helpers/canvas"

import { Action, ActionArgument, Session, SessionPayload } from "@canvas-js/interfaces";
import { getActionSignatureData } from "@canvas-js/verifiers"

import app from 'state';
import { ChainBase } from 'common-common/src/types';
import { ISessionController, EthereumSessionController, SubstrateSessionController, CosmosSDKSessionController, SolanaSessionController, NEARSessionController } from './sessionSigners';

class SessionsController {
  ethereum: EthereumSessionController;
  substrate: SubstrateSessionController;
  cosmos: CosmosSDKSessionController;
  solana: SolanaSessionController;
  near: NEARSessionController;

  constructor() {
    this.ethereum = new EthereumSessionController();
    this.substrate = new SubstrateSessionController();
    this.cosmos = new CosmosSDKSessionController();
    this.solana = new SolanaSessionController();
    this.near = new NEARSessionController();
  }

  getSessionController(chainBase: ChainBase): ISessionController<any> {
    if (chainBase == "ethereum") return this.ethereum;
    else if (chainBase == "substrate") return this.substrate;
    else if (chainBase == "cosmos") return this.cosmos;
    else if (chainBase == "solana") return this.solana;
    else if (chainBase == "near") return this.near;
  }

  // Get a session address. Generate one and cache in localStorage if none exists.
  public getOrCreateAddress(chainBase: ChainBase, chainId: string): Promise<string> {
    return this.getSessionController(chainBase).getOrCreateAddress(chainId);
  }

  // Provide authentication for a session address, by presenting a signed SessionPayload.
  public authSession(chainBase: ChainBase, chainId: string, payload: SessionPayload, signature: string) {
    return this.getSessionController(chainBase).authSession(chainId, payload, signature)
  }

  // Sign an arbitrary action, using context from the last authSession() call.
  private async sign(
    call: string,
    args: Record<string, ActionArgument>
  ): Promise<{ session: Session, action: Action, hash: string }> {
    const chainBase = app.chain?.base;
    const chainId = app.chain?.meta.node.ethChainId || 1; // TODO: support other chains

    // Try to request a new session from the user, if one was not found.
    const controller = this.getSessionController(chainBase);
    if (controller.getAddress(chainId) === undefined) {
      await sessionSigninModal().catch((err) => {
        console.log('Login failed')
        throw err
      })
    }
    return controller.sign(chainId, call, args);
  }

  // Public signer methods
  public async signThread({ community, title, body, link, topic }) {
    const { session, action, hash } = await this.sign("thread", {
      community: community || '',
      title,
      body,
      link: link || '',
      topic: topic || '',
    });
    return { session, action, hash }
  }

  public async signDeleteThread({ thread_id }) {
    const { session, action, hash } = await this.sign("deleteThread", { thread_id });
    return { session, action, hash }
  }

  public async signComment({ thread_id, body, parent_comment_id }) {
    const { session, action, hash } = await this.sign("comment", { thread_id, body, parent_comment_id });
    return { session, action, hash }
  }

  public async signDeleteComment({ comment_id }) {
    const { session, action, hash } = await this.sign("deleteComment", { comment_id });
    return { session, action, hash }
  }

  public async signThreadReaction({ thread_id, like }) {
    const value = like ? "like" : "dislike";
    const { session, action, hash } = await this.sign("reactThread", { thread_id, value });
    return { session, action, hash }
  }

  public async signDeleteThreadReaction({ thread_id }) {
    const { session, action, hash } = await this.sign("unreactThread", { thread_id });
    return { session, action, hash }
  }

  public async signCommentReaction({ comment_id, like }) {
    const value = like ? "like" : "dislike";
    const { session, action, hash } = await this.sign("reactComment", { comment_id, value });
    return { session, action, hash }
  }

  public async signDeleteCommentReaction({ comment_id }) {
    const { session, action, hash } = await this.sign("unreactComment", { comment_id });
    return { session, action, hash }
  }
}

export default SessionsController;
