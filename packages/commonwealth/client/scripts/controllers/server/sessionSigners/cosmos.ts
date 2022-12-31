import { actionToHash } from "helpers/canvas"
import { Secp256k1Wallet } from '@cosmjs/amino';
import { Random, Bip39 } from "@cosmjs/crypto";

import { Action, Session, ActionArgument, ActionPayload, SessionPayload } from "@canvas-js/interfaces";
import { ISessionController } from "."

// For canvasActionToSignDoc:
import { AminoMsg, makeSignDoc, StdSignDoc, StdFee } from '@cosmjs/amino';

export const canvasActionPayloadToSignDoc = (
  actionPayload: ActionPayload,
  address: string
): StdSignDoc => {
  const accountNumber = 0;
  const sequence = 0;
  const chainId = '';
  const fee: StdFee = {
    gas: '0',
    amount: [],
  };
  const memo = '';

  const jsonTx: AminoMsg = {
    type: 'sign/MsgSignData',
    value: {
      signer: address,
      data: JSON.stringify(actionPayload),
    },
  };
  const signDoc = makeSignDoc(
    [jsonTx],
    fee,
    chainId,
    memo,
    accountNumber,
    sequence
  );
  return signDoc;
}

export class CosmosSDKSessionController implements ISessionController {
  signers: Record<string, { signer: Secp256k1Wallet, address: string }> = {};
  private auths: Record<number, { payload: SessionPayload, signature: string }> = {};

  getAddress(chainId: string): string {
    return this.signers[chainId]?.address;
  }

  hasAuthenticatedSession(chainId: string): boolean {
    return this.signers[chainId] !== undefined && this.auths[chainId] !== undefined;
  }

  async getOrCreateAddress(chainId: string): Promise<string> {
    await this.getOrCreateSigner(chainId);
    return this.signers[chainId]?.address;
  }

  async authSession(chainId: string, payload: SessionPayload, signature: string) {
    // TODO: verify signature key matches this.signers[chainId]
    // TODO: verify signature is valid
    // TODO: verify payload datetime is valid
    this.auths[chainId] = { payload, signature }

    const authStorageKey = `CW_SESSIONS-cosmos-${chainId}-auth`
    localStorage.setItem(authStorageKey, JSON.stringify(this.auths[chainId]))
  }

  private async getOrCreateSigner(chainId: string): Promise<Secp256k1Wallet> {
    if (this.signers[chainId] !== undefined) {
      return this.signers[chainId]?.signer;
    }
    const storageKey = `CW_SESSIONS-cosmos-${chainId}`;
    const authStorageKey = `CW_SESSIONS-cosmos-${chainId}-auth`
    try {
      const storage = localStorage.getItem(storageKey);
      const { privateKey } = JSON.parse(storage);
      const signer = await Secp256k1Wallet.fromKey(privateKey);
      const accounts = await signer.getAccounts();
      const address = accounts[0].address;
      this.signers[chainId] = { signer, address };

      // TODO: verify signature key matches this.signers[chainId]
      // TODO: verify signature is valid
      // TODO: verify payload datetime is valid
      const auth = localStorage.getItem(authStorageKey);
      if (auth !== null) {
        const { payload, signature }: { payload: SessionPayload, signature: string } = JSON.parse(auth);
        this.auths[chainId] = { payload, signature };
      }
    } catch (err) {
      // Use same configuration for generating private keys as @cosmjs/amino Secp256k1HdWallet
      const entropyLength = 4 * Math.floor((11 * 24) / 33);
      const privateKey = Random.getBytes(entropyLength);

      const signer = await Secp256k1Wallet.fromKey(privateKey);
      const accounts = await signer.getAccounts();
      const address = accounts[0].address;
      this.signers[chainId] = { signer, address };
      delete this.auths[chainId];
      localStorage.setItem(storageKey, JSON.stringify({ privateKey, address }))
    }
    return this.signers[chainId].signer;
  }

  async sign(chainId: string, call: string, args: Record<string, ActionArgument>):
  Promise<{ session: Session, action: Action, hash: string }> {
    const { signer, address } = this.signers[chainId];
    const sessionPayload: SessionPayload = this.auths[chainId]?.payload;
    const sessionSignature: string = this.auths[chainId]?.signature;
    // TODO: verify payload is not expired

		const actionPayload: ActionPayload = {
      from: sessionPayload.from,
      spec: sessionPayload.spec,
      timestamp: +Date.now(),
			chain: "cosmos",
			chainId,
      blockhash: sessionPayload.blockhash,
      call,
      args,
    };

    const signDoc = canvasActionPayloadToSignDoc(actionPayload, address);
    const signatureBase64 = (await signer.signAmino(sessionPayload.address, signDoc)).signature.signature;
    const signature = '0x' + (new Buffer(signatureBase64, 'base64')).toString('hex');

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

    const hash = Buffer.from(actionToHash(action)).toString('hex');

    return { session, action, hash };
  }
}
