/* eslint-disable @typescript-eslint/ban-types */
import m from 'mithril';
import { Button, List, ListItem } from 'construct-ui';

import app from 'state';

import { link } from 'helpers';
import {
  chainEntityTypeToProposalSlug,
  chainEntityTypeToProposalName,
  getProposalUrlPath,
} from 'identifiers';
import { OffchainThread } from 'models';
import { LinkedThreadRelation } from 'client/scripts/models/OffchainThread';
import {
  loadMultipleSpacesData,
  SnapshotProposal,
  SnapshotSpace,
} from 'helpers/snapshot_utils';
import LinkedThreadModal from '../../modals/linked_thread_modal';
import { slugify } from '../../../../../shared/utils';

export const ProposalSidebarLinkedChainEntity: m.Component<{
  proposal: OffchainThread;
  chainEntity;
}> = {
  view: (vnode) => {
    const { proposal, chainEntity } = vnode.attrs;
    const slug = chainEntityTypeToProposalSlug(chainEntity.type);
    if (!slug) return;

    const proposalLink = `${
      app.isCustomDomain() ? '' : `/${proposal.chain}`
    }${getProposalUrlPath(slug, chainEntity.typeId)}`;

    return m('.ProposalSidebarLinkedChainEntity', [
      link('a', proposalLink, [
        `${chainEntityTypeToProposalName(chainEntity.type)} #${
          chainEntity.typeId
        }`,
        chainEntity.completed === 't' ? ' (Completed) ' : ' ',
      ]),
    ]);
  },
};

export const ProposalSidebarLinkedSnapshot: m.Component<
  {
    proposal: OffchainThread;
  },
  {
    initialized: boolean;
    snapshotProposalsLoaded: boolean;
    space: SnapshotSpace;
    snapshot: SnapshotProposal;
  }
> = {
  view: (vnode) => {
    const { proposal } = vnode.attrs;
    if (!proposal.snapshotProposal) return;
    if (!app.chain?.meta.chain.snapshot) return;

    if (!vnode.state.initialized) {
      vnode.state.initialized = true;
      loadMultipleSpacesData(app.chain.meta.chain.snapshot).then((data) => {
        for (const { space, proposals } of data) {
          const matching_snapshot = proposals.find(
            (sn) => sn.id === proposal.snapshotProposal
          );
          if (matching_snapshot) {
            vnode.state.snapshot = matching_snapshot;
            vnode.state.space = space;
            break;
          }
        }
        vnode.state.snapshotProposalsLoaded = true;
        m.redraw();
      });
    }

    let proposalLink = '';
    if (vnode.state.space && vnode.state.snapshot) {
      proposalLink = `${
        app.isCustomDomain() ? '' : `/${proposal.chain}`
      }/snapshot/${vnode.state.space.id}/${vnode.state.snapshot.id}`;
    }

    return m(
      '.ProposalSidebarLinkedSnapshot',
      !vnode.state.snapshotProposalsLoaded
        ? [
            link('a', proposalLink, [
              `Snapshot: ${proposal.snapshotProposal.slice(0, 10)} ...`,
            ]),
          ]
        : [
            link('a', proposalLink, [
              `Snapshot: ${vnode.state.snapshot.title.slice(0, 20)} ...`,
            ]),
          ]
    );
  },
};

export const ProposalSidebarPollEditorModule: m.Component<
  {
    proposal;
    openPollEditor: Function;
  },
  {
    isOpen: boolean;
  }
> = {
  view: (vnode) => {
    const { proposal, openPollEditor } = vnode.attrs;
    return m('.ProposalSidebarPollEditorModule', [
      m('.placeholder-copy', 'Add an offchain poll to this thread?'),
      m(Button, {
        rounded: true,
        compact: true,
        fluid: true,
        disabled: !!proposal.offchainVotingEndsAt,
        label: proposal.offchainVotingEndsAt
          ? 'Polling enabled'
          : 'Create a poll',
        onclick: (e) => {
          e.preventDefault();
          openPollEditor();
        },
      }),
    ]);
  },
};

export const ProposalLinkedThreadsEditorModule: m.Component<
  {
    proposalId: number;
    allowLinking: boolean;
  },
  {
    fetchLinkedThreads: boolean;
    loading: boolean;
    linkedThreads: OffchainThread[];
  }
> = {
  oninit: (vnode) => {
    vnode.state.fetchLinkedThreads = true;
  },
  view: (vnode) => {
    const { allowLinking, proposalId } = vnode.attrs;
    const proposal = app.threads.getById(proposalId);
    if (!proposal) return;
    if (!vnode.state.linkedThreads) {
      vnode.state.linkedThreads = [];
    }
    if (!proposal.linkedThreads?.length) {
      vnode.state.fetchLinkedThreads = false;
    }
    if (vnode.state.fetchLinkedThreads) {
      vnode.state.fetchLinkedThreads = false;
      vnode.state.loading = true;
      app.threads
        .fetchThreadsFromId(
          proposal.linkedThreads.map(
            (relation: LinkedThreadRelation) => relation.linkedThread
          )
        )
        .then((result) => {
          vnode.state.linkedThreads = result;
          vnode.state.loading = false;
        })
        .catch((err) => {
          console.error(err);
          vnode.state.loading = false;
        });
      return null;
    }
    if (allowLinking || proposal.linkedThreads.length) {
      return m('.ProposalLinkedThreadsEditorModule', [
        !!vnode.state.linkedThreads?.length &&
          m('.linked-threads-title', 'Linked Threads:'),
        m(
          List,
          vnode.state.linkedThreads.map((thread) => {
            const discussionLink = getProposalUrlPath(
              thread.slug,
              `${thread.identifier}-${slugify(thread.title)}`
            );
            return m(ListItem, {
              label: link('a.linked-thread', discussionLink, thread.title),
            });
          })
        ),
        allowLinking &&
          m(Button, {
            disabled: vnode.state.loading,
            rounded: true,
            compact: true,
            fluid: true,
            label: proposal.linkedThreads?.length
              ? 'Link another thread'
              : 'Link threads',
            onclick: (e) => {
              e.preventDefault();
              app.modals.create({
                modal: LinkedThreadModal,
                data: {
                  linkingThread: proposal,
                  linkedThreads: vnode.state.linkedThreads,
                },
              });
            },
          }),
      ]);
    }
  },
};

export const ProposalSidebarLinkedViewer: m.Component<{
  proposal: OffchainThread;
  openStageEditor: Function;
  showAddProposalButton: boolean;
}> = {
  view: (vnode) => {
    const { proposal, openStageEditor, showAddProposalButton } = vnode.attrs;

    return m('.ProposalSidebarLinkedViewer', [
      proposal.chainEntities.length > 0 || proposal.snapshotProposal?.length > 0
        ? m('.placeholder-copy', 'Proposals for Thread:')
        : m(
            '.placeholder-copy',
            app.chain
              ? 'Connect an on-chain proposal?'
              : 'Track the progress of this thread?'
          ),
      proposal.chainEntities.length > 0 &&
        m('.proposal-chain-entities', [
          proposal.chainEntities.map((chainEntity) => {
            return m(ProposalSidebarLinkedChainEntity, {
              proposal,
              chainEntity,
            });
          }),
        ]),
      proposal.snapshotProposal?.length > 0 &&
        m(ProposalSidebarLinkedSnapshot, { proposal }),
      showAddProposalButton &&
        m('.ConnectProposalButtonWrapper', [
          m(Button, {
            rounded: true,
            compact: true,
            fluid: true,
            label: app.chain ? 'Connect a proposal' : 'Update status',
            onclick: (e) => {
              e.preventDefault();
              openStageEditor();
            },
          }),
        ]),
    ]);
  },
};
