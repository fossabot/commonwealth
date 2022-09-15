import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { Action, Session, ActionArgument, SessionPayload } from "@canvas-js/interfaces";
import { ISessionController } from "."

export class CosmosSDKSessionController implements ISessionController {
  signers: Record<string, DirectSecp256k1HdWallet> = {};
  addresses: Record<string, string> = {};

  getAddress(chainId: string): string {
    return this.addresses[chainId];
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    await this.getOrCreateSigner(chainId);
    return this.addresses[chainId];
  }

  async authSession(chainId: string, sessionPayload: SessionPayload, signature: string) {
    // TODO
    throw new Error("unimplemented")
  }

  private async getOrCreateSigner(chainId: string): Promise<DirectSecp256k1HdWallet> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId];
    }
    const storageKey = `CW_SESSIONS-cosmos-${chainId}`;
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey, sessionPayload, blockInfo } = JSON.parse(storage);
      this.signers[chainId] = await DirectSecp256k1HdWallet.generate();
      const accounts = await this.signers[chainId].getAccounts();
      this.addresses[chainId] = accounts[0].address;
    } catch (err) {
      // this.signers[chainId] = ethers.Wallet.createRandom();
    }
    return this.signers[chainId];
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>):
  Promise<{ session: Session, action: Action, hash: string }> {
    // TODO
    throw new Error("unimplemented")
  }
}
