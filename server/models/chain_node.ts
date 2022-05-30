import * as Sequelize from 'sequelize'; // must use "* as" to avoid scope errors
import { Model, DataTypes } from 'sequelize';
import { CommunityInstance, CommunityAttributes } from './community';
import { ModelStatic, ModelInstance } from './types';

export type ChainNodeAttributes = {
  community_id: string;
  url: string;
  id?: number;
  address?: string;
  token_name?: string;
  ce_verbose?: boolean;
  eth_chain_id?: number;
  alt_wallet_url?: string;
  private_url?: string;

  // associations
  Community?: CommunityAttributes;
}

export type ChainNodeInstance = ModelInstance<ChainNodeAttributes> & {
  // TODO: add mixins as needed
  getCommunity: Sequelize.BelongsToGetAssociationMixin<CommunityInstance>;
}

export type ChainNodeModelStatic = ModelStatic<ChainNodeInstance>;

export default (
  sequelize: Sequelize.Sequelize,
  dataTypes: typeof DataTypes
): ChainNodeModelStatic => {
  const ChainNode = <ChainNodeModelStatic>sequelize.define(
    'ChainNode',
    {
      id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      community_id: { type: dataTypes.STRING, allowNull: false },
      url: { type: dataTypes.STRING, allowNull: false },
      address: { type: dataTypes.STRING, allowNull: true },
      token_name: { type: dataTypes.STRING, allowNull: true },
      ce_verbose: { type: dataTypes.BOOLEAN, allowNull: true },
      eth_chain_id: { type: dataTypes.INTEGER, allowNull: true },
      alt_wallet_url: { type: dataTypes.STRING, allowNull: true },
      private_url: { type: dataTypes.STRING, allowNull: true },
    },
    {
      tableName: 'ChainNodes',
      timestamps: false,
      underscored: true,
      indexes: [{ fields: ['community_id'] }],
      defaultScope: {
        attributes: {
          exclude: [
            'private_url'
          ],
        }
      },
      scopes: {
        withPrivateData: {}
      }
    },
  );

  ChainNode.associate = (models) => {
    models.ChainNode.belongsTo(models.Community, { foreignKey: 'community_id' });
  };

  return ChainNode;
};
