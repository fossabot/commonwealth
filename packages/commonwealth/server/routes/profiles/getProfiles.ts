import Sequelize from 'sequelize';
import { GetProfilesReq, GetProfilesResp, needParamErrMsg } from 'common-common/src/api/extApiTypes';
import { oneOf, query, validationResult } from 'express-validator';
import { TypedRequestQuery, TypedResponse, success, failure } from '../../types';
import { DB } from '../../models';
import { formatPagination } from '../../util/queries';

const { Op } = Sequelize;

export const getProfilesValidation = [
  oneOf([
    query('addresses').exists().toArray(),
    query('profile_ids').exists().toArray(),
  ], `${needParamErrMsg} (addresses, profile_ids)`),
  query('count_only').optional().isBoolean().toBoolean()
];

const getProfiles = async (
  models: DB,
  req: TypedRequestQuery<GetProfilesReq>,
  res: TypedResponse<GetProfilesResp>,
) => {
  const errors = validationResult(req).array();
  if (errors.length !== 0) {
    return failure(res.status(400), errors);
  }
  // This route is for fetching all profiles + addresses by community
  const { addresses, profile_ids, count_only } = req.query;

  const pagination = formatPagination(req.query);

  const where = {};
  if (profile_ids) where['id'] = { [Op.in]: profile_ids, };
  const include = [];
  if (addresses) include.push({
    model: models.Address,
    where: { address: { [Op.in]: addresses } },
    required: true
  });

  let profiles, count;
  if (!count_only) {
    ({ rows: profiles, count } = await models.Profile.findAndCountAll({
      logging: console.log,
      where,
      include,
      attributes: { exclude: ['user_id'] },
      ...pagination,
    }));
  } else {
    count = await models.Profile.count({
      where,
      attributes: { exclude: ['user_id'] },
      include,
      ...pagination,
    });
  }

  return success(res, { profiles, count });
};


export default getProfiles;
