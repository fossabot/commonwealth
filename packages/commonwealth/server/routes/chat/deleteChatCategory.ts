import { NextFunction, Request, Response } from 'express';
import { DB } from '../../models';
import { AppError, ServerError } from 'common-common/src/errors';

export const Errors = {
    NotLoggedIn: 'Not logged in',
    NotAdmin: 'Must be an admin to delete a chat category',
    NoChainId: 'No chain id given',
    NoCategory: 'No category name given'
};

export default async (models: DB, req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new AppError(Errors.NotLoggedIn));
    }

    if (!req.user.isAdmin) {
        return next(new AppError(Errors.NotAdmin))
    }

    if (!req.body.chain_id) {
        return next(new AppError(Errors.NoChainId))
    }

    if (!req.body.category) {
        return next(new AppError(Errors.NoCategory))
    }

    // finds all channels with category and deletes them
    try {
        await models.ChatChannel.destroy({
            where: {
                chain_id: req.body.chain_id,
                category: req.body.category
            }
        });
    } catch (e) {
        return next(new ServerError(e))
    }

    return res.json({ status: 'Success' });
}
