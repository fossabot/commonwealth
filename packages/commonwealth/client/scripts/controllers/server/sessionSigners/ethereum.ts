import { ethers } from "ethers"
import { Action, ActionArgument, ActionPayload, Session, SessionPayload } from "@canvas-js/interfaces";
import { getActionSignatureData } from "@canvas-js/verifiers";
import { actionToHash } from "helpers/canvas"
import { ISessionController } from "."

export class EthereumSessionController implements ISessionController {
  private signers: Record<number, ethers.Wallet> = {};
  private auths: Record<number, { payload: SessionPayload, signature: string }> = {};

  getAddress(chainId: string): string | null {
    return this.signers[chainId]?.address;
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    return (await this.getOrCreateSigner(chainId)).address;
  }

  async authSession(chainId: string, payload: SessionPayload, signature: string) {
    // TODO: recover the publickey from payload/signature; ensure it matches signers[chainId].address
    this.auths[chainId] = { payload, signature }

    const authStorageKey = `CW_SESSIONS-eth-${chainId}-auth`
    localStorage.setItem(authStorageKey, JSON.stringify(this.auths[chainId]))
  }

  private async getOrCreateSigner(chainId: string): Promise<ethers.Wallet> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId];
    }
    const storageKey = `CW_SESSIONS-eth-${chainId}`;
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey } = JSON.parse(storage);
      this.signers[chainId] = new ethers.Wallet(privateKey);

      const authStorageKey = `CW_SESSIONS-eth-${chainId}-auth`
      const auth = localStorage.getItem(authStorageKey);
      const { payload, signature }: { payload: SessionPayload, signature: string } = JSON.parse(auth);
      this.auths[chainId] = { payload, signature };
    } catch (err) {
      this.signers[chainId] = ethers.Wallet.createRandom();
      delete this.auths[chainId]
      const privateKey = this.signers[chainId].privateKey;
      localStorage.setItem(storageKey, JSON.stringify({ privateKey }))
    }
    return this.signers[chainId];
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>): Promise<{
    session: Session,
    action: Action,
    hash: string
  }> {
    const actionSigner = this.signers[chainId];
    const sessionPayload = this.auths[chainId]?.payload;
    const sessionSignature = this.auths[chainId]?.signature;
    // TODO: verify signature; verify ecrecover'ed address

		const actionPayload: ActionPayload = {
      from: sessionPayload.from,
      spec: sessionPayload.spec,
      timestamp: +Date.now(),
			chain: "eth",
			chainId,
      blockhash: sessionPayload.blockhash,
      call,
      args,
    };

    const [domain, types, value] = getActionSignatureData(actionPayload);
    const signature = await actionSigner._signTypedData(domain, types, value);

    const session: Session = {
      type: "session",
      payload: sessionPayload,
      signature: sessionSignature,
    }
    const action: Action = {
      type: "action",
      payload: actionPayload,
      session: sessionPayload.from,
      signature,
    }
    const hash = actionToHash(action).toString();

    return { session, action, hash };
  }
}
