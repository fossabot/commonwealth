import { KeyPair } from 'near-api-js';
import { PublicKey } from 'near-api-js/lib/utils';
import { Action, Session, ActionArgument, SessionPayload } from "@canvas-js/interfaces";
import { ISessionController } from "."

export class NEARSessionController implements ISessionController {
  keys: Record<string, string> = {};
  addresses: Record<string, string> = {};
  signers: Record<string, KeyPair> = {};

  getAddress(chainId: string): string {
    return this.addresses[chainId];
  }

  hasAuthenticatedSession(chainId: string): boolean {
    // TODO: verify
    return this.signers[chainId] && this.keys[chainId];
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    await this.getOrCreateSigner(chainId);
    return this.addresses[chainId];
  }

  async authSession(chainId: string, sessionPayload: SessionPayload, signature: string) {
    // TODO
    throw new Error("unimplemented")
  }

  private async getOrCreateSigner(chainId: string): Promise<KeyPair> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId];
    }
    const storageKey = `CW_SESSIONS-near-${chainId}`;
    // TODO: test session restoration on NEAR
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey, sessionPayload, blockInfo } = JSON.parse(storage);
      this.signers[chainId] = KeyPair.fromString(privateKey);
    } catch (err) {
      const signer = KeyPair.fromRandom("ed25519")
      const privKey = signer.toString()
      const pubKey = Buffer.from(PublicKey.fromString(privKey).data).toString("hex");
      this.keys[chainId] = privKey;
      this.addresses[chainId] = pubKey;
      this.signers[chainId] = signer;
    }
    return this.signers[chainId];
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>): Promise<{session: Session, action: Action, hash: string}> {
    // TODO
    throw new Error("unimplemented")
  }
}
