import { Keyring, KeyringPair } from '@polkadot/api';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Action, ActionArgument, Session, SessionPayload } from "@canvas-js/interfaces";
import { ISessionController } from "."

export class SubstrateSessionController implements ISessionController {
  keyring: Keyring = new Keyring();
  signers: Record<string, KeyringPair> = {};
  privKeys: Record<string, string> = {};
  pubKeys: Record<string, string> = {};

  private auths: Record<number, { payload: SessionPayload, signature: string }> = {};

  getAddress(chainId: string) {
    return this.addresses[chainId];
  }

  hasAuthenticatedSession(chainId: string): boolean {
    // TODO: verify
    return this.signers[chainId] && this.privKeys[chainId];
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    await this.getOrCreateSigner(chainId);
    return this.addresses[chainId];
  }

  async authSession(chainId: string, sessionPayload: SessionPayload, signature: string) {
    // TODO
    throw new Error("unimplemented")
  }

  private async getOrCreateSigner(chainId: string): Promise<void> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId];
    }
    const storageKey = `CW_SESSIONS-substrate-${chainId}`;
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey, sessionPayload, blockInfo } = JSON.parse(storage);
      this.privKeys[chainId] = mnemonicGenerate();
      this.signers[chainId] = this.keyring.addFromUri(this.privKeys[chainId], {});

    } catch (err) {
      // this.signers[chainId] = ethers.Wallet.createRandom();
    }
    return this.signers[chainId];
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>):
    Promise<{session: Session, action: Action, hash: string}> {
    // TODO
    throw new Error("unimplemented")
  }
}
