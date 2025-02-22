import { Sequelize } from 'sequelize';

import { AddressModelStatic } from './models/address';
import { AttachmentModelStatic } from './models/attachment';
import { BanModelStatic } from './models/ban';
import { ChainModelStatic } from './models/chain';
import { ChainCategoryModelStatic } from './models/chain_category';
import { ChainCategoryTypeModelStatic } from './models/chain_category_type';
import { ChainEntityMetaModelStatic } from './models/chain_entity_meta';
import { ChainEventTypeModelStatic } from './models/chain_event_type';
import { ChainNodeModelStatic } from './models/chain_node';
import { ChatChannelModelStatic } from './models/chat_channel';
import { ChatMessageModelStatic } from './models/chat_message';
import { CollaborationModelStatic } from './models/collaboration';
import { CommentModelStatic } from './models/comment';
import { CommunityBannerModelStatic } from './models/community_banner';
import { CommunityContractModelStatic } from './models/community_contract';
import { CommunityRoleModelStatic } from './models/community_role';
import { ContractModelStatic } from './models/contract';
import { ContractAbiModelStatic } from './models/contract_abi';
import { DiscussionDraftModelStatic } from './models/discussion_draft';
import { IdentityCacheStatic } from './models/identity_cache';
import { InviteCodeModelStatic } from './models/invite_code';
import { LinkedThreadModelStatic } from './models/linked_thread';
import { LoginTokenModelStatic } from './models/login_token';
import { NotificationModelStatic } from './models/notification';
import { NotificationsReadModelStatic } from './models/notifications_read';
import { NotificationCategoryModelStatic } from './models/notification_category';
import { OffchainProfileModelStatic } from './models/offchain_profile';
import { PollModelStatic } from './models/poll';
import { ProfileModelStatic } from './models/profile';
import { ReactionModelStatic } from './models/reaction';
import { RoleModelStatic } from './models/role';
import { RoleAssignmentModelStatic } from './models/role_assignment';
import { RuleModelStatic } from './models/rule';
import { SocialAccountModelStatic } from './models/social_account';
import { SsoTokenModelStatic } from './models/sso_token';
import { StarredCommunityModelStatic } from './models/starred_community';
import { SubscriptionModelStatic } from './models/subscription';
import { TaggedThreadModelStatic } from './models/tagged_threads';
import { ThreadModelStatic } from './models/thread';
import { TokenModelStatic } from './models/token';
import { TopicModelStatic } from './models/topic';
import { UserModelStatic } from './models/user';
import { ViewCountModelStatic } from './models/viewcount';
import { VoteModelStatic } from './models/vote';
import { WaitlistRegistrationModelStatic } from './models/waitlist_registration';
import { WebhookModelStatic } from './models/webhook';
import { SnapshotProposalModelStatic } from './models/snapshot_proposal';
import { SnapshotSpaceModelStatic } from './models/snapshot_spaces';
import { CommunitySnapshotSpaceModelStatic } from './models/community_snapshot_spaces';
import { DiscordBotConfigModelStatic } from './models/discord_bot_config';

export type Models = {
  Address: AddressModelStatic;
  Ban: BanModelStatic;
  Chain: ChainModelStatic;
  ChainCategory: ChainCategoryModelStatic;
  ChainCategoryType: ChainCategoryTypeModelStatic;
  ChainEntityMeta: ChainEntityMetaModelStatic;
  ChainEventType: ChainEventTypeModelStatic;
  ChainNode: ChainNodeModelStatic;
  ChatChannel: ChatChannelModelStatic;
  ChatMessage: ChatMessageModelStatic;
  Contract: ContractModelStatic;
  ContractAbi: ContractAbiModelStatic;
  CommunityContract: CommunityContractModelStatic;
  CommunityRole: CommunityRoleModelStatic;
  CommunitySnapshotSpaces: CommunitySnapshotSpaceModelStatic;
  Collaboration: CollaborationModelStatic;
  CommunityBanner: CommunityBannerModelStatic;
  DiscussionDraft: DiscussionDraftModelStatic;
  DiscordBotConfig: DiscordBotConfigModelStatic;
  IdentityCache: IdentityCacheStatic;
  InviteCode: InviteCodeModelStatic;
  LinkedThread: LinkedThreadModelStatic;
  LoginToken: LoginTokenModelStatic;
  Notification: NotificationModelStatic;
  NotificationCategory: NotificationCategoryModelStatic;
  NotificationsRead: NotificationsReadModelStatic;
  Attachment: AttachmentModelStatic;
  Comment: CommentModelStatic;
  Poll: PollModelStatic;
  OffchainProfile: OffchainProfileModelStatic;
  Reaction: ReactionModelStatic;
  Thread: ThreadModelStatic;
  Topic: TopicModelStatic;
  ViewCount: ViewCountModelStatic;
  Vote: VoteModelStatic;
  Profile: ProfileModelStatic;
  RoleAssignment: RoleAssignmentModelStatic;
  Role: RoleModelStatic;
  Rule: RuleModelStatic;
  SocialAccount: SocialAccountModelStatic;
  SsoToken: SsoTokenModelStatic;
  StarredCommunity: StarredCommunityModelStatic;
  SnapshotProposal: SnapshotProposalModelStatic;
  Subscription: SubscriptionModelStatic;
  SnapshotSpace: SnapshotSpaceModelStatic;
  Token: TokenModelStatic;
  TaggedThread: TaggedThreadModelStatic;
  User: UserModelStatic;
  WaitlistRegistration: WaitlistRegistrationModelStatic;
  Webhook: WebhookModelStatic;
};

export interface DB extends Models {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}
