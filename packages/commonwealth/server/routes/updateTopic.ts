/* eslint-disable quotes */
import { Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { DB } from '../models';
import { AppError, ServerError } from 'common-common/src/errors';
import { findAllRoles } from '../util/roles';

enum UpdateTopicErrors {
  NoUser = 'Not logged in',
  NoThread = 'Must provide thread_id',
  NoAddr = 'Must provide address',
  NoTopic = 'Must provide topic_name or topic_id',
  InvalidAddr = 'Invalid address',
  NoPermission = `You do not have permission to edit post topic`,
}

const updateTopic = async (
  models: DB,
  req,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(new AppError(UpdateTopicErrors.NoUser));
  if (!req.body.thread_id)
    return next(new AppError(UpdateTopicErrors.NoThread));
  if (!req.body.address) return next(new AppError(UpdateTopicErrors.NoAddr));
  if (!req.body.topic_name && !req.body.topic_id)
    return next(new AppError(UpdateTopicErrors.NoTopic));

  const userAddresses = await req.user.getAddresses();
  const userAddress = userAddresses.find(
    (a) => !!a.verified && a.address === req.body.address
  );
  if (!userAddress) return next(new AppError(UpdateTopicErrors.InvalidAddr));

  const thread = await models.Thread.findOne({
    where: {
      id: req.body.thread_id,
    },
  });

  const roles: any[] = await findAllRoles(
    models,
    { where: { address_id: userAddress.id } },
    thread.chain,
    ['admin', 'moderator']
  );
  const isAdminOrMod = roles.length > 0;

  if (!isAdminOrMod) {
    const isAuthor = await models.Thread.findOne({
      where: {
        id: req.body.thread_id,
        address_id: { [Op.in]: userAddresses.map((addr) => addr.id) },
      },
    });

    if (!isAuthor) {
      return next(new AppError(UpdateTopicErrors.NoPermission));
    }
  }

  // remove deleted topics
  let newTopic;
  if (req.body.topic_id) {
    thread.topic_id = req.body.topic_id;
    await thread.save();
    newTopic = await models.Topic.findOne({
      where: { id: req.body.topic_id },
    });
  } else {
    [newTopic] = await models.Topic.findOrCreate({
      where: {
        name: req.body.topic_name,
        chain_id: thread.chain,
      },
    });
    thread.topic_id = newTopic.id;
    await thread.save();
  }
  return res.json({ status: 'Success', result: newTopic.toJSON() });
};

export default updateTopic;
