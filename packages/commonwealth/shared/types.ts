import { ChainAttributes } from '../server/models/chain';
import { ChainEventAttributes } from 'chain-events/services/database/models/chain_event';
import type { SnapshotProposalAttributes } from '../server/models/snapshot_proposal';

export enum WebsocketMessageNames {
  ChainEventNotification = 'chain-event-notification',
  SnapshotProposalNotification = 'snapshot-proposal-notification',
  SnapshotListener = 'snapshot-listener',
  NewSubscriptions = 'new-subscriptions',
  DeleteSubscriptions = 'delete-subscriptions',
  ChatMessage = 'chat-message',
  JoinChatChannel = 'join-chat-channel',
  LeaveChatChannel = 'leave-chat-channel',
  Error = 'exception',
}
export type SnapshotProposalNotification = {
  id: string;
  category_id: 'snapshot-proposal';
  chain_id: string;
  SnapshotProposal: SnapshotProposalAttributes;
};

export type ChainEventNotification = {
  id: number;
  notification_data: string;
  chain_event_id: number;
  category_id: 'chain-event';
  chain_id: string;
  updated_at: Date;
  created_at: Date;
  ChainEvent: ChainEventAttributes;
}

export interface SnapshotNotification {
  id?: string;
  title?: string;
  body?: string;
  choices?: string[];
  space?: string;
  event?: string;
  start?: string;
  expire?: string;
}

export interface INotification {
  kind: ChainEventNotification | SnapshotNotification;
}

export enum WebsocketNamespaces {
  SnapshotProposals = 'snapshot-proposals',
  ChainEvents = 'chain-events',
  SnapshotListener = 'snapshot-listener',
  Chat = 'chat',
}

export enum WebsocketEngineEvents {
  CreateRoom = 'create-room',
  DeleteRoom = 'delete-room',
}

export interface InviteCodeAttributes {
  id?: string;
  community_name?: string;
  chain_id?: string;
  creator_id: number;
  invited_email?: string;
  used?: boolean;
  created_at?: Date;
  updated_at?: Date;
  Chain?: ChainAttributes;
}

export interface IPostNotificationData {
  created_at: any;
  root_id: number | string;
  root_title: string;
  root_type: string;
  comment_id?: number;
  comment_text?: string;
  parent_comment_id?: number;
  parent_comment_text?: string;
  chain_id: string;
  author_address: string;
  author_chain: string;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
}

export interface ICommunityNotificationData {
  created_at: any;
  role_id: string | number;
  author_address: string;
  chain: string;
}

export interface IChainEventNotificationData {
  chainEvent: any;
  chainEventType: any;
  chain_id: string;
}

export interface ISnapshotNotificationData {
  created_at: Date;
  snapshot_id: string;
  chain_id: string;
  snapshotEventType: string;
}

export interface IChatNotification {
  message_id: string | number;
  channel_id: string | number;
  chain_id: string;
  author_address: string;
  created_at: any;
}

export enum ContentType {
  Thread = 'thread',
  Comment = 'comment',
  // Proposal = 'proposal',
}

export enum SearchContentType {
  Thread = 'thread',
  Comment = 'comment',
  Chain = 'chain',
  Token = 'token',
  Member = 'member',
}

export const PROFILE_NAME_MAX_CHARS = 40;
export const PROFILE_HEADLINE_MAX_CHARS = 80;
export const PROFILE_BIO_MAX_CHARS = 1000;
export const PROFILE_NAME_MIN_CHARS = 3;

export const DynamicTemplate = {
  ImmediateEmailNotification: 'd-3f30558a95664528a2427b40292fec51',
  BatchNotifications: 'd-468624f3c2d7434c86ae0ed0e1d2227e',
  SignIn: 'd-db52815b5f8647549d1fe6aa703d7274',
  SignUp: 'd-2b00abbf123e4b5981784d17151e86be',
  EmailInvite: 'd-000c08160c07459798b46c927b638b9a',
  UpdateEmail: 'd-a0c28546fecc49fb80a3ba9e535bff48',
  VerifyAddress: 'd-292c161f1aec4d0e98a0bf8d6d8e42c2',
};

export type TokenResponse = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
};

export type SnapshotGraphQLResponse = {
  data?: {
    proposal: {
      id: string;
      title: string;
      body: string;
      choices: string[];
      start: number;
      end: number;
      snapshot: number;
      author: string;
      created: number;
      scores: number[];
      scores_by_strategy: number[][];
      scores_total: number;
      scores_updated: number;
      plugins: any;
      network: string;
      strategies: any;
      space: {
        id: string;
        name: string;
      };
    };
  };
};
