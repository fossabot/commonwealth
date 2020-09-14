import 'modals/new_thread_modal.scss';

import $ from 'jquery';
import m from 'mithril';
import { CompactModalExitButton } from 'views/modal';
import { NewThreadForm } from 'views/components/new_thread_form';
import app from 'state';

const NewThreadModal = {
  view: (vnode) => {
    const hasTopics = !!(app.community?.meta.topics.length || app.chain?.meta.topics.length);
    return m('.NewThreadModal', [
      m('.compact-modal-title', [
        m('h3', 'New thread'),
        m(CompactModalExitButton),
      ]),
      m('.compact-modal-body-max', [
        m(NewThreadForm, { isModal: true, hasTopics }),
      ]),
    ]);
  }
};

export default NewThreadModal;
