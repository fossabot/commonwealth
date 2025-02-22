import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { factory, formatFilename } from 'common-common/src/logging';
import { DB } from '../models';
import { AppError, ServerError } from 'common-common/src/errors';
import { findAllRoles } from '../util/roles';

const log = factory.getLogger(formatFilename(__filename));

export const Errors = {
  NoThreadId: 'Must provide thread_id',
  NoReadOnly: 'Must pass in read_only',
  NoThread: 'Cannot find thread',
  NotAdmin: 'Not an admin',
};

const updateThreadPrivacy = async (
  models: DB,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { thread_id, read_only } = req.body;
  if (!thread_id) return next(new AppError(Errors.NoThreadId));
  if (!read_only) return next(new AppError(Errors.NoReadOnly));

  try {
    const thread = await models.Thread.findOne({
      where: {
        id: thread_id,
      },
    });
    if (!thread) return next(new AppError(Errors.NoThread));
    const userOwnedAddressIds = (await req.user.getAddresses())
      .filter((addr) => !!addr.verified)
      .map((addr) => addr.id);
    if (!userOwnedAddressIds.includes(thread.address_id)) {
      // is not author
      const roles = await findAllRoles(
        models,
        { where: { address_id: { [Op.in]: userOwnedAddressIds } } },
        thread.chain,
        ['admin', 'moderator']
      );
      const role = roles.find((r) => {
        return r.chain_id === thread.chain;
      });
      if (!role) return next(new AppError(Errors.NotAdmin));
    }

    await thread.update({ read_only });

    const finalThread = await models.Thread.findOne({
      where: { id: thread_id },
      include: [
        {
          model: models.Address,
          as: 'Address',
        },
        {
          model: models.Address,
          // through: models.Collaboration,
          as: 'collaborators',
        },
        models.Attachment,
        {
          model: models.Topic,
          as: 'topic',
        },
      ],
    });

    return res.json({ status: 'Success', result: finalThread.toJSON() });
  } catch (e) {
    return next(new ServerError(e));
  }
};

export default updateThreadPrivacy;
