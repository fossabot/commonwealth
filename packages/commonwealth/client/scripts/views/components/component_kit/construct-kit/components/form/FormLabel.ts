import m from 'mithril';
import { Classes, IAttrs } from 'client/scripts/views/components/component_kit/construct-kit/_shared';

export interface IFormLabelAttrs extends IAttrs {
  [htmlAttrs: string]: any;
}

export class FormLabel implements m.Component<IFormLabelAttrs> {
  public view({ attrs, children }: m.Vnode<IFormLabelAttrs>) {
    return m(`label.${Classes.FORM_LABEL}`, { ...attrs }, children);
  }
}
