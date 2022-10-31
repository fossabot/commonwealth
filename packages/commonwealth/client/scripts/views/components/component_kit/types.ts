import { IconName } from './cw_icons/cw_icon_lookup';

export enum ComponentType {
  AccountCreationButton = 'AccountCreationButton',
  AddressTooltip = 'AddressTooltip',
  Avatar = 'Avatar',
  AvatarUpload = 'AvatarUpload',
  Banner = 'Banner',
  Breadcrumbs = 'Breadcrumbs',
  Button = 'Button',
  ButtonGroup = 'ButtonGroup',
  Card = 'Card',
  Checkbox = 'Checkbox',
  Collapsible = 'Collapsible',
  CommunityAvatar = 'CommunityAvatar',
  ContentPage = 'ContentPage',
  CustomIcon = 'CustomIcon',
  Divider = 'Divider',
  EngagementButton = 'EngagementButton',
  ExternalLink = 'ExternalLink',
  GradientButton = 'GradientButton',
  Growl = 'Growl',
  Icon = 'Icon',
  IconButton = 'IconButton',
  Label = 'Label',
  MessageBanner = 'MessageBanner',
  MobileMenu = 'MobileMenu',
  Modal = 'Modal',
  Popover = 'Popover',
  PopoverMenu = 'PopoverMenu',
  ProgressBar = 'ProgressBar',
  RadioButton = 'RadioButton',
  RadioGroup = 'RadioGroup',
  Spinner = 'Spinner',
  Tab = 'Tab',
  TabBar = 'TabBar',
  Tag = 'Tag',
  Text = 'Text',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  ThreadVoteButton = 'ThreadVoteButton',
  TokenInput = 'TokenInput',
  Toggle = 'Toggle',
  ValidationText = 'ValidationText',
  WalletOptionRow = 'WalletOptionRow',
}

export type StyleAttrs = {
  disabled?: boolean;
  className?: string;
};

export type DividerMenuItem = { type: 'divider' };

export type HeaderMenuItem = { type: 'header'; label: string };

export type DefaultMenuItem = {
  disabled?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  isSecondary?: boolean;
  label: string;
  onclick: () => void;
  type?: 'default';
};

export type NotificationMenuItem = {
  hasUnreads: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  label: string;
  onclick: () => void;
  type: 'notification';
};

export type MenuItem =
  | DividerMenuItem
  | HeaderMenuItem
  | DefaultMenuItem
  | NotificationMenuItem;
