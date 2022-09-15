import { ChainBase, ChainNetwork, WalletId } from 'common-common/src/types';
import { SessionPayload } from '@canvas-js/interfaces';

import Account from './Account';
import BlockInfo from './BlockInfo';
import { ChainId } from '@canvas-js/interfaces';

interface IWebWallet<AccountT extends { address: string } | string> {
  name: WalletId;
  label: string;
  available: boolean;
  enabled: boolean;
  enabling: boolean;
  accounts: readonly AccountT[];

  enable: () => Promise<void>;
  reset?: () => Promise<void>;

  getChainId(): ChainId | null;
  getRecentBlock: (chainIdentifier: string) => Promise<BlockInfo>;

  signCanvasMessage(account: Account, canvasMessage: SessionPayload): Promise<string>;

  chain: ChainBase;
  defaultNetwork: ChainNetwork;

  // optional parameter used to specify the exact chain that a wallet is associated with (if any)
  specificChains?: string[];
}

export default IWebWallet;
