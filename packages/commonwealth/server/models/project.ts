import * as Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import { ChainAttributes } from './chain';
import { ChainEntityAttributes } from './chain_entity';
import { ModelStatic, ModelInstance } from './types';

export type Permission = 'admin' | 'moderator' | 'member';

<<<<<<< HEAD:server/models/project.ts
// TODO, updating with data necessary to populate client-side model,
// e.g. incl description, title, coverImage, etc

=======
>>>>>>> master:packages/commonwealth/server/models/project.ts
export type ProjectAttributes = {
  // populated immediately
  id: number;
  chain_id?: string; // Chains fk, null if created by event
  created_at?: Date;
  updated_at?: Date;

  // populated by creation event
  entity_id: number; // ChainEntities fk
  creator: string;
  ipfs_hash_id?: number;

<<<<<<< HEAD:server/models/project.ts
  // TODO: This organizational schema no longer up to date
=======
>>>>>>> master:packages/commonwealth/server/models/project.ts
  // populated from contract queries
  beneficiary: string;
  token: string;
  curator_fee: string;
  threshold: string;
  deadline: number;
  funding_amount: string;

<<<<<<< HEAD:server/models/project.ts
  title: string;
  short_description: string;
  description: string;
  cover_image: string;

  Chain?: ChainAttributes;
  ChainEntity?: ChainEntityAttributes;
};
=======
  Chain?: ChainAttributes;
  ChainEntity?: ChainEntityAttributes;
}
>>>>>>> master:packages/commonwealth/server/models/project.ts

export type ProjectInstance = ModelInstance<ProjectAttributes>;

export type ProjectModelStatic = ModelStatic<ProjectInstance>;

export default (
  sequelize: Sequelize.Sequelize,
<<<<<<< HEAD:server/models/project.ts
  dataTypes: typeof DataTypes
): ProjectModelStatic => {
  const Project = <ProjectModelStatic>sequelize.define(
    'Project',
    {
      id: { type: dataTypes.INTEGER, primaryKey: true, allowNull: false },
      entity_id: { type: dataTypes.INTEGER, allowNull: false },
      chain_id: { type: dataTypes.STRING, allowNull: true },
      ipfs_hash_id: { type: dataTypes.INTEGER, allowNull: true },

      creator: { type: dataTypes.STRING, allowNull: false },
      beneficiary: { type: dataTypes.STRING, allowNull: false },
      token: { type: dataTypes.STRING, allowNull: false },

      curator_fee: { type: dataTypes.STRING, allowNull: false },
      threshold: { type: dataTypes.STRING, allowNull: false },
      deadline: { type: dataTypes.INTEGER, allowNull: false },
      funding_amount: { type: dataTypes.STRING, allowNull: false },

      title: { type: dataTypes.STRING(64), allowNull: false },
      short_description: { type: dataTypes.STRING(224), allowNull: false },
      description: { type: dataTypes.TEXT, allowNull: false },
      cover_image: { type: dataTypes.TEXT, allowNull: false },

      created_at: { type: dataTypes.DATE, allowNull: false },
      updated_at: { type: dataTypes.DATE, allowNull: false },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'Projects',
      underscored: true,
      indexes: [], // TODO: determine which indexes are needed
    }
  );

  Project.associate = (models) => {
    models.Project.belongsTo(models.Chain, {
      foreignKey: 'chain_id',
      targetKey: 'id',
    });
    models.Project.belongsTo(models.ChainEntity, {
      foreignKey: 'entity_id',
      targetKey: 'id',
    });
    models.Project.belongsTo(models.IpfsPins, {
      foreignKey: 'ipfs_hash_id',
      targetKey: 'id',
    });
=======
  dataTypes: typeof DataTypes,
): ProjectModelStatic => {
  const Project = <ProjectModelStatic>sequelize.define('Project', {
    id: { type: dataTypes.INTEGER, primaryKey: true, allowNull: false },
    chain_id: { type: dataTypes.STRING, allowNull: true },
    entity_id: { type: dataTypes.INTEGER, allowNull: false },
    creator: { type: dataTypes.STRING, allowNull: false },
    ipfs_hash_id: { type: dataTypes.INTEGER, allowNull: true },

    beneficiary: { type: dataTypes.STRING, allowNull: false },
    token: { type: dataTypes.STRING, allowNull: false },
    curator_fee: { type: dataTypes.STRING, allowNull: false },
    threshold: { type: dataTypes.STRING, allowNull: false },
    deadline: { type: dataTypes.INTEGER, allowNull: false },
    funding_amount: { type: dataTypes.STRING, allowNull: false },

    created_at: { type: dataTypes.DATE, allowNull: false },
    updated_at: { type: dataTypes.DATE, allowNull: false },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Projects',
    underscored: true,
    indexes: [], // TODO: determine which indexes are needed
  });

  Project.associate = (models) => {
    models.Project.belongsTo(models.Chain, { foreignKey: 'chain_id', targetKey: 'id' });
    models.Project.belongsTo(models.ChainEntity, { foreignKey: 'entity_id', targetKey: 'id' });
    models.Project.belongsTo(models.IpfsPins, { foreignKey: 'ipfs_hash_id', targetKey: 'id' });
>>>>>>> master:packages/commonwealth/server/models/project.ts
  };

  return Project;
};
