/* @jsx m */
import 'pages/projects/index.scss';

import m from 'mithril';
import app from 'state';
import { SelectList, TabItem, Tabs } from 'construct-ui';
import { CWText } from 'views/components/component_kit/cw_text';
import { notifyInfo } from 'controllers/app/notifications';
import { CWButton } from 'views/components/component_kit/cw_button';
import { RoleInfo } from 'models';
import { ChainBase, ChainNetwork } from 'common-common/src/types';
import Sublayout from 'views/sublayout';
import ExplorePage from './explore_page';
import YourPage from './your_page';
import Web3 from 'web3';

enum ProjectListingSubpage {
  Explore = 'explore',
  Yours = 'yours',
}

export default class ProjectListing implements m.ClassComponent {
  private subpage: ProjectListingSubpage;
  private web3Initialized: boolean;
  private web3: Web3;
  private currentBlockNum: number;

  async initializeWeb3() {
    const cmnUrl = app.config.chains.getById(ChainNetwork.CommonProtocol)?.node
      ?.url;
    if (!cmnUrl) return;
    try {
      const provider = new Web3.providers.WebsocketProvider(cmnUrl);
      this.web3 = new Web3(provider);
    } catch (error) {
      console.log(`Could not connect to Ethereum on ${cmnUrl}`);
      throw error;
    }
    this.web3Initialized = true;
  }

  async getBlockNumber() {
    this.currentBlockNum = await this.web3.eth.getBlockNumber();
  }

  view(vnode) {
    const { subpage } = vnode.attrs;
    if (!app) return;

    const onExplore = subpage !== ProjectListingSubpage.Yours;
    if (!app.isLoggedIn() && !onExplore) {
      m.route.set('/projects/explore');
    }

    if (!this.web3Initialized) {
      this.initializeWeb3();
      this.getBlockNumber();
    }

    return (
      <Sublayout
        title="Projects"
        hideSearch={true}
        hideSidebar={true}
        showNewProposalButton={false}
        alwaysShowTitle={true}
      >
        <div class="ProjectListing">
          <div class="listing-header">
            <CWText type="h1">Crowdfunding</CWText>
            <Tabs align="left" bordered={false} fluid={true}>
              <TabItem
                label={[
                  <CWText type="h5" fontWeight="semibold">
                    Explore
                  </CWText>,
                ]}
                active={subpage === ProjectListingSubpage.Explore}
                onclick={() => {
                  m.route.set(`/projects/${ProjectListingSubpage.Explore}`);
                  m.redraw();
                }}
              />
              <TabItem
                label={[
                  <CWText type="h5" fontWeight="semibold">
                    Your Projects
                  </CWText>,
                ]}
                active={subpage === ProjectListingSubpage.Yours}
                onclick={() => {
                  if (!app.user) {
                    notifyInfo(
                      'Log in or create an account for user dashboard.'
                    );
                  }
                  m.route.set(`/projects/${ProjectListingSubpage.Yours}`);
                  m.redraw();
                }}
              />
            </Tabs>
            <SelectList
              items={app.user.roles
                .map((role: RoleInfo) => role.chain_id)
                .filter(
                  (id) =>
                    app.config.chains.getById(id).base === ChainBase.Ethereum
                )}
              itemRender={(chainId: string) => {
                return (
                  <div value={chainId} style="cursor: pointer">
                    <CWText type="body1">{chainId}</CWText>
                  </div>
                );
              }}
              emptyContent={m(
                '',
                'Join (or create) an Ethereum community to create a project'
              )}
              filterable={false}
              onSelect={(chainId: string) => {
                m.route.set(`/${chainId}/new/project`);
              }}
              trigger={<CWButton label="Create Project" />}
            />
          </div>
          <div class="listing-body">
            {onExplore ? (
              <ExplorePage currentBlockNum={this.currentBlockNum} />
            ) : (
              <YourPage currentBlockNum={this.currentBlockNum} />
            )}
          </div>
        </div>
      </Sublayout>
    );
  }
}
