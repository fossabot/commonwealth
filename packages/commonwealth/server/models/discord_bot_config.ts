import * as Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { ModelStatic, ModelInstance } from './types';

export type DiscordBotConfigAttributes = {
  id: number;
  bot_id: string;
  chain_id: string;
  guild_id: string;
  snapshot_channel_id: string;
  verification_token: string;
  token_expiration: Date;
};

export type DiscordBotConfigInstance =
  ModelInstance<DiscordBotConfigAttributes>;

export type DiscordBotConfigModelStatic = ModelStatic<DiscordBotConfigInstance>;

export default (
  sequelize: Sequelize.Sequelize,
  dataTypes: typeof DataTypes
): DiscordBotConfigModelStatic => {
  const DiscordBotConfig = <DiscordBotConfigModelStatic>sequelize.define(
    'DiscordBotConfig',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, // autogenerated
      bot_id: { type: Sequelize.STRING, allowNull: true },
      chain_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Chains', key: 'id' },
      },
      guild_id: { type: Sequelize.STRING, allowNull: true },
      snapshot_channel_id: { type: Sequelize.STRING, allowNull: true },
      verification_token: { type: Sequelize.STRING, allowNull: true },
      token_expiration: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    },
    {
      tableName: 'DiscordBotConfig',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return DiscordBotConfig;
};
