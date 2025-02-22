import m from 'mithril';
import moment from 'moment';

import app from 'state';
import { NotificationSubscription, Thread } from 'models';
import { notifySuccess } from 'controllers/app/notifications';
import { NotificationCategories } from '../../../../../../common-common/src/types';

export const getLastUpdated = (thread: Thread) => {
  const { lastCommentedOn } = thread;
  const lastComment = lastCommentedOn ? Number(lastCommentedOn.utc()) : 0;
  const createdAt = Number(thread.createdAt.utc());
  const lastUpdate = Math.max(createdAt, lastComment);
  return moment(lastUpdate);
};

export const isHot = (thread: Thread) => {
  return (
    moment.duration(moment().diff(getLastUpdated(thread))).asSeconds() <
    24 * 60 * 60
  );
};

export const getLastUpdate = (thread: Thread): number => {
  const lastComment = thread.lastCommentedOn?.unix() || 0;
  const createdAt = thread.createdAt?.unix() || 0;
  const lastUpdate = Math.max(createdAt, lastComment);
  return lastUpdate;
};

export const onFeaturedDiscussionPage = (p, topic) =>
  decodeURI(p).endsWith(`/discussions/${topic}`);

export const orderDiscussionsbyLastComment = (a, b) => {
  const tsB = Math.max(+b.createdAt, +(b.lastCommentedOn || 0));
  const tsA = Math.max(+a.createdAt, +(a.lastCommentedOn || 0));
  return tsB - tsA;
};

const handleToggleSubscription = async (
  thread: Thread,
  commentSubscription: NotificationSubscription,
  reactionSubscription: NotificationSubscription,
  isSubscribed: boolean
) => {
  if (!commentSubscription || !reactionSubscription) {
    await Promise.all([
      app.user.notifications.subscribe(
        NotificationCategories.NewReaction,
        thread.uniqueIdentifier
      ),
      app.user.notifications.subscribe(
        NotificationCategories.NewComment,
        thread.uniqueIdentifier
      ),
    ]);
    notifySuccess('Subscribed!');
  } else if (isSubscribed) {
    await app.user.notifications.disableSubscriptions([
      commentSubscription,
      reactionSubscription,
    ]);
    notifySuccess('Unsubscribed!');
  } else {
    await app.user.notifications.enableSubscriptions([
      commentSubscription,
      reactionSubscription,
    ]);
    notifySuccess('Subscribed!');
  }

  m.redraw();
};

export const getCommentSubscription = (thread: Thread) => {
  return app.user.notifications.subscriptions.find(
    (v) =>
      v.objectId === thread.uniqueIdentifier &&
      v.category === NotificationCategories.NewComment
  );
};

export const getReactionSubscription = (thread: Thread) => {
  return app.user.notifications.subscriptions.find(
    (v) =>
      v.objectId === thread.uniqueIdentifier &&
      v.category === NotificationCategories.NewReaction
  );
};

export const getThreadSubScriptionMenuItem = (thread: Thread) => {
  const commentSubscription = getCommentSubscription(thread);
  const reactionSubscription = getReactionSubscription(thread);

  const isSubscribed =
    commentSubscription?.isActive && reactionSubscription?.isActive;

  return {
    onclick: (e) => {
      e.preventDefault();
      handleToggleSubscription(
        thread,
        getCommentSubscription(thread),
        getReactionSubscription(thread),
        isSubscribed
      );
      m.redraw();
    },
    label: isSubscribed ? 'Unsubscribe' : 'Subscribe',
    iconLeft: isSubscribed ? 'unsubscribe' : 'bell',
  };
};
