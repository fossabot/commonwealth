import {NextFunction, Request, Response} from "express";
import {DB} from "../../database";

export const Errors = {
    NotLoggedIn: 'Not logged in',
    NotAdmin: 'Must be an admin to rename a chat category',
    NoCommunityId: 'No community id given',
    NoCategory: 'No category name given'
};

export default async (models: DB, req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new Error(Errors.NotLoggedIn));
    }

    if (!req.user.isAdmin) {
        return next(new Error(Errors.NotAdmin))
    }

    if (!req.body.community_id) {
        return next(new Error(Errors.NoCommunityId))
    }

    if (!req.body.category) {
        return next(new Error(Errors.NoCategory))
    }

    // finds all channels with category and deletes them
    const channels = await models.ChatChannel.findAll({
        where: {
            community_id: req.body.community_id,
            category: req.body.category
        }
    });

    try {
        await Promise.all(channels.map(c => {return c.destroy()}))
    } catch (e) {
        return next(new Error(e))
    }

    return res.json({ status: 'Success' });
}
