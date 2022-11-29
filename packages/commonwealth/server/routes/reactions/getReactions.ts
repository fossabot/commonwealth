import { Action } from 'common-common/src/permissions';
import validateChain from '../../util/validateChain';
import { TypedRequestQuery, TypedResponse, success } from '../../types';
import { DB } from '../../models';
import { ReactionAttributes } from '../../models/reaction';
import { checkReadPermitted } from '../../util/roles';

type GetReactionReq = {
  community_id: string;
  thread_id?: number;
  comment_id?: number;
  addresses?: string[];

  // TODO: goes in pagination helper
  limit?: number;
  page?: string;
  sort?: string;
  count_only?: boolean;
};

type GetReactionsResp = ReactionAttributes[];

const getReactions = async (
  models: DB,
  req: TypedRequestQuery<GetReactionReq>,
  res: TypedResponse<GetReactionsResp>,
) => {
  await checkReadPermitted(
    models,
    req.query.community_id,
    Action.VIEW_REACTIONS,
    req.user?.id,
  );
  return success(res, []);
};

export default getReactions;
