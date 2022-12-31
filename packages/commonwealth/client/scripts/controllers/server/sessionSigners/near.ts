import { KeyPair } from 'near-api-js';
import { PublicKey } from 'near-api-js/lib/utils';
import { Action, Session, ActionArgument, SessionPayload } from "@canvas-js/interfaces";
import { ISessionController } from "."

export class NEARSessionController implements ISessionController {
  private signers: Record<string, KeyPair> = {};
  private auths: Record<number, { payload: SessionPayload, signature: string }> = {};

  getAddress(chainId: string): string {
    return this.signers[chainId].getPublicKey().toString();
  }

  hasAuthenticatedSession(chainId: string): boolean {
    return this.signers[chainId] !== undefined && this.auths[chainId] !== undefined;
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    return (await this.getOrCreateSigner(chainId)).getPublicKey().toString();
  }

  async authSession(chainId: string, payload: SessionPayload, signature: string) {
    // TODO: verify signature key matches this.signers[chainId]
    // TODO: verify signature is valid
    // TODO: verify payload datetime is valid
    this.auths[chainId] = { payload, signature };

    const authStorageKey = `CW_SESSIONS-near-${chainId}-auth`
    localStorage.setItem(authStorageKey, JSON.stringify(this.auths[chainId]));
  }

  private async getOrCreateSigner(chainId: string): Promise<KeyPair> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId];
    }
    const storageKey = `CW_SESSIONS-near-${chainId}`;
    const authStorageKey = `CW_SESSIONS-near-${chainId}-auth`;
    // TODO: test session restoration on NEAR
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey } = JSON.parse(storage);
      this.signers[chainId] = KeyPair.fromString(privateKey);

      // TODO: verify signature key matches this.signers[chainId]
      // TODO: verify signature is valid
      // TODO: verify payload datetime is valid
      const auth = localStorage.getItem(authStorageKey);
      if (auth !== null) {
        const { payload, signature }: { payload: SessionPayload, signature: string } = JSON.parse(auth);
        this.auths[chainId] = { payload, signature };
      }
    } catch (err) {
      this.signers[chainId] = KeyPair.fromRandom("ed25519");
      delete this.auths[chainId];
      localStorage.setItem(storageKey, JSON.stringify({ privateKey: this.signers[chainId].toString() })); 
      // ?? this isn't the privatekey
    }
    return this.signers[chainId];
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>): Promise<{session: Session, action: Action, hash: string}> {
    // TODO
    throw new Error("unimplemented")
  }
}
