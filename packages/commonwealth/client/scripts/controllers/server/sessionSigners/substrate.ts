import { Keyring } from '@polkadot/api';
import { IKeyringPair } from '@polkadot/types/types';

import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Action, ActionArgument, Session, SessionPayload } from "@canvas-js/interfaces";
import { ISessionController } from "."

export class SubstrateSessionController implements ISessionController {
  keyring: Keyring = new Keyring();
  signers: Record<string, { pair: IKeyringPair, privateKey: string }> = {};
  private auths: Record<number, { payload: SessionPayload, signature: string }> = {};

  getAddress(chainId: string) {
    return new Buffer(this.signers[chainId].pair.publicKey).toString('hex'); // TODO: use chainId to format?
  }

  hasAuthenticatedSession(chainId: string): boolean {
    return this.signers[chainId] !== undefined && this.auths[chainId] !== undefined;
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    return new Buffer((await this.getOrCreateSigner(chainId)).pair.publicKey).toString('hex'); // TODO: use chainId to format?
  }

  async authSession(chainId: string, payload: SessionPayload, signature: string) {
    // TODO: verify signature key matches this.signers[chainId]
    // TODO: verify signature is valid
    // TODO: verify payload datetime is valid

    this.auths[chainId] = { payload, signature }

    const authStorageKey = `CW_SESSIONS-substrate-${chainId}-auth`
    localStorage.setItem(authStorageKey, JSON.stringify(this.auths[chainId]))
  }

  private async getOrCreateSigner(chainId: string): Promise<IKeyringPair> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId].pair;
    }
    const storageKey = `CW_SESSIONS-substrate-${chainId}`;
    const authStorageKey = `CW_SESSIONS-substrate-${chainId}-auth`
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey } = JSON.parse(storage);
      const pair = this.keyring.addFromUri(privateKey, {}); // Use sr25519 by default?
      this.signers[chainId] = { pair, privateKey };

      // TODO: verify signature key matches this.signers[chainId]
      // TODO: verify signature is valid
      // TODO: verify payload datetime is valid
      const auth = localStorage.getItem(authStorageKey);
      if (auth !== null) {
        const { payload, signature }: { payload: SessionPayload, signature: string } = JSON.parse(auth);
        this.auths[chainId] = { payload, signature };
      }
    } catch (err) {
      const mnemonic = mnemonicGenerate();
      const pair = this.keyring.addFromMnemonic(mnemonic);
      this.signers[chainId] = { pair, privateKey: mnemonic };
      delete this.auths[chainId]
      localStorage.setItem(storageKey, JSON.stringify({ privateKey: mnemonic }))
    }
    return this.signers[chainId].pair;
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>):
    Promise<{session: Session, action: Action, hash: string}> {
    // TODO
    throw new Error("unimplemented")
  }
}
