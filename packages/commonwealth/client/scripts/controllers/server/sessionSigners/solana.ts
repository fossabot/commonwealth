import * as solw3 from '@solana/web3.js';
import bs58 from "bs58";
import { Action, ActionArgument, Session, SessionPayload } from "@canvas-js/interfaces";
import { ISessionController } from "."

export class SolanaSessionController implements ISessionController {
  signers: Record<string, solw3.Keypair> = {};
  private auths: Record<number, { payload: SessionPayload, signature: string }> = {};

  getAddress(chainId: string): string | null {
    return this.signers[chainId].publicKey.toBase58();
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    return (await this.getOrCreateSigner(chainId)).publicKey.toBase58();
  }

  async authSession(chainId: string, sessionPayload: SessionPayload, signature: string) {
    // TODO
    throw new Error("unimplemented")
  }

  private async getOrCreateSigner(chainId: string): Promise<solw3.Keypair> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId];
    }
    const storageKey = `CW_SESSIONS-solana-${chainId}`;
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey }: { privateKey: string } = JSON.parse(storage);
      this.signers[chainId] = solw3.Keypair.fromSecretKey(bs58.decode(privateKey));

      const authStorageKey = `CW_SESSIONS-solana-${chainId}-auth`
      const auth = localStorage.getItem(authStorageKey);
      const { payload, signature }: { payload: SessionPayload, signature: string } = JSON.parse(auth);
      this.auths[chainId] = { payload, signature };
    } catch (err) {
      this.signers[chainId] = solw3.Keypair.generate();
      delete this.auths[chainId]
      const privateKey = bs58.encode(this.signers[chainId].secretKey);
      localStorage.setItem(storageKey, JSON.stringify({ privateKey }))
    }
    return this.signers[chainId];
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>):
    Promise<{session: Session, action: Action, hash: string}> {
    // TODO
    throw new Error("unimplemented")
  }
}
