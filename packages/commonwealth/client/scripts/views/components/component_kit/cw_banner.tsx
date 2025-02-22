/* @jsx m */

import m from 'mithril';
import ClassComponent from 'class_component';

import 'components/component_kit/cw_banner.scss';

import { CWText } from './cw_text';
import { ComponentType } from './types';
import { CWIconButton } from './cw_icon_button';
import { getClasses } from './helpers';

type BannerAttrs = {
  bannerContent: string | m.Vnode;
  className?: string;
  onClose?: () => void;
};

export class CWBanner extends ClassComponent<BannerAttrs> {
  view(vnode: m.Vnode<BannerAttrs>) {
    const { bannerContent, className, onClose } = vnode.attrs;

    return (
      <div
        class={getClasses<{ className?: string }>(
          { className },
          ComponentType.Banner
        )}
      >
        <CWText type="b2">{bannerContent}</CWText>
        {onClose && <CWIconButton iconName="close" onclick={onClose} />}
      </div>
    );
  }
}

export class CWMessageBanner extends ClassComponent<BannerAttrs> {
  view(vnode: m.Vnode<BannerAttrs>) {
    const { bannerContent, className, onClose } = vnode.attrs;

    return (
      <div
        class={getClasses<{ className?: string }>(
          { className },
          ComponentType.MessageBanner
        )}
      >
        <CWText type="b1" fontWeight="semiBold">
          {bannerContent}
        </CWText>
        {onClose && (
          <CWIconButton
            iconName="close"
            onclick={onClose}
            iconButtonTheme="primary"
          />
        )}
      </div>
    );
  }
}
