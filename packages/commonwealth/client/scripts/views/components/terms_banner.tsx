/* @jsx m */

import m from 'mithril';
import ClassComponent from 'class_component';

import 'pages/terms_banner.scss';

import app from 'state';
import { CWBanner } from './component_kit/cw_banner';
import { CWText } from './component_kit/cw_text';

type TermsBannerAttrs = { terms: string };

export class TermsBanner extends ClassComponent<TermsBannerAttrs> {
  view(vnode: m.Vnode<TermsBannerAttrs>) {
    const { terms } = vnode.attrs;

    return (
      <CWBanner
        className="TermsBanner"
        bannerContent={
          <CWText type="b2" className="terms-text">
            Please check out our <a href={terms}>terms of service</a>.
          </CWText>
        }
        onClose={() =>
          localStorage.setItem(`${app.activeChainId()}-tos`, 'off')
        }
      />
    );
  }
}
