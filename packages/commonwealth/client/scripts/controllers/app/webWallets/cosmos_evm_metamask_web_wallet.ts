import { bech32 } from 'bech32';

declare let window: any;

import Web3 from 'web3';
import { provider } from 'web3-core';
import { ChainBase, ChainNetwork, WalletId } from 'common-common/src/types';
import { Account, IWebWallet } from 'models';
import app from 'state';
import { setActiveAccount } from 'controllers/app/login';
import { Address } from 'ethereumjs-util';

function encodeEthAddress(bech32Prefix: string, address: string): string {
  return bech32.encode(
    bech32Prefix,
    bech32.toWords(Address.fromString(address).toBuffer())
  );
}

class CosmosEvmWebWalletController implements IWebWallet<string> {
  // GETTERS/SETTERS
  private _enabled: boolean;
  private _enabling = false;
  private _accounts: string[] = [];
  private _ethAccounts: string[];
  private _provider: provider;
  private _web3: Web3;

  public readonly name = WalletId.CosmosEvmMetamask;
  public readonly label = 'Metamask (Cosmos)';
  public readonly chain = ChainBase.CosmosSDK;
  public readonly defaultNetwork = ChainNetwork.Injective;
  public readonly specificChains = ['injective', 'evmos'];

  public get available() {
    return !!window.ethereum;
  }

  public get provider() {
    return this._provider;
  }

  public get enabled() {
    return this.available && this._enabled;
  }

  public get enabling() {
    return this._enabling;
  }

  public get accounts() {
    return this._accounts || [];
  }

  public async signMessage(message: string): Promise<string> {
    const signature = await this._web3.eth.personal.sign(
      message,
      this._ethAccounts[0],
      ''
    );
    return signature;
  }

  public async signWithAccount(account: Account): Promise<string> {
    const webWalletSignature = await this.signMessage(account.validationToken);
    return webWalletSignature;
  }

  public async validateWithAccount(
    account: Account,
    walletSignature: string
  ): Promise<void> {
    // Sign with the method on eth_webwallet, because we don't have access to the private key
    return account.validate(walletSignature);
  }

  // ACTIONS
  public async enable() {
    console.log('Attempting to enable Metamask');
    this._enabling = true;
    try {
      // (this needs to be called first, before other requests)
      this._web3 = new Web3((window as any).ethereum);
      await this._web3.givenProvider.enable();

      this._ethAccounts = await this._web3.eth.getAccounts();
      this._provider = this._web3.currentProvider;
      if (this._ethAccounts.length === 0) {
        throw new Error('Could not fetch accounts from Metamask');
      } else {
        for (const acc of this._ethAccounts) {
          this._accounts.push(
            encodeEthAddress(app.chain?.meta.bech32Prefix || 'inj', acc)
          );
        }
      }

      await this.initAccountsChanged();
      this._enabled = true;
      this._enabling = false;
    } catch (error) {
      console.error(`Failed to enable Metamask: ${error.message}`);
      this._enabling = false;
    }
  }

  public async initAccountsChanged() {
    await this._web3.givenProvider.on(
      'accountsChanged',
      async (accounts: string[]) => {
        const encodedAccounts = accounts.map((a) =>
          encodeEthAddress(app.chain?.meta.bech32Prefix || 'inj', a)
        );
        const updatedAddress = app.user.activeAccounts.find(
          (addr) => addr.address === encodedAccounts[0]
        );
        if (!updatedAddress) return;
        await setActiveAccount(updatedAddress);
      }
    );
    // TODO: chainChanged, disconnect events
  }

  // TODO: disconnect
}

export default CosmosEvmWebWalletController;
