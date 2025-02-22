import { Request, Response, NextFunction } from 'express';
import { DB } from '../models';

export const getTokensFromLists = async (
  models: DB,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens = await models.Token.findAll();
    const chains = await models.Chain.findAll();
    const chainNames = chains.map((chain) => chain.name.toLowerCase());
    const filteredTokens = tokens.filter((token) => !chainNames.includes(token.name.toLowerCase()));
    return res.json({ status: 'Success', result: filteredTokens });
  } catch (e) {
    return res.json({ status: 'Failure', message: e.message });
  }
};
