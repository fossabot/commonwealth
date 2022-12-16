'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
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
          verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          token_expiration: { type: Sequelize.DATE, allowNull: true },
          created_at: { type: Sequelize.DATE, allowNull: false },
          updated_at: { type: Sequelize.DATE, allowNull: false },
        },
        { transaction: t }
      );

      await queryInterface.addColumn(
        'Chains',
        'discord_config_id',
        {
          type: Sequelize.INTEGER,
          references: { model: 'DiscordBotConfig', key: 'id' },
          allowNull: true,
        },
        { transaction: t }
      );

      await queryInterface.addColumn('Subscriptions', 'snapshot_id', {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await queryInterface.createTable(
        'SnapshotProposals',
        {
          id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          body: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          choices: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
          },
          space: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          event: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          start: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          expire: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          createdAt: { type: Sequelize.DATE, allowNull: false },
          updatedAt: { type: Sequelize.DATE, allowNull: false },
        },
        {
          timestamps: true,
          indexes: [{ fields: ['id'] }],
        }
      );

      await queryInterface.createTable(
        'SnapshotSpaces',
        {
          snapshot_space: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
          },
          created_at: { type: Sequelize.DATE, allowNull: false },
          updated_at: { type: Sequelize.DATE, allowNull: false },
        },
        { transaction: t }
      );

      await queryInterface.createTable(
        'CommunitySnapshotSpaces',
        {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          }, // autogenerated
          snapshot_space_id: { type: Sequelize.STRING, allowNull: false },
          chain_id: { type: Sequelize.STRING, allowNull: false },
          created_at: { type: Sequelize.DATE, allowNull: false },
          updated_at: { type: Sequelize.DATE, allowNull: false },
        },
        { transaction: t }
      );

      await queryInterface.sequelize.query(
        `INSERT INTO "SnapshotSpaces" (snapshot_space, created_at, updated_at) 
      SELECT DISTINCT UNNEST(snapshot), NOW(), NOW() FROM "Chains";`,
        { transaction: t }
      );

      await queryInterface.sequelize.query(
        `INSERT INTO "CommunitySnapshotSpaces" (chain_id, snapshot_space_id, created_at, updated_at)
          SELECT c.id, s.snapshot_space, NOW(), NOW()
          FROM (SELECT DISTINCT id, UNNEST(snapshot) as snaps FROM "Chains") c
            INNER JOIN "SnapshotSpaces" s
              ON c.snaps = s.snapshot_space;`,
        { transaction: t }
      );

      await queryInterface.removeColumn('Chains', 'snapshot', {
        transaction: t,
      });

      await queryInterface.bulkInsert(
        'NotificationCategories',
        [
          {
            name: 'snapshot-proposal',
            description: 'Snapshot proposal notifications',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction: t }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('Chains', 'discord_config_id', {
        transaction: t,
      });
      await queryInterface.removeColumn('Subscriptions', 'snapshot_id', {
        transaction: t,
      });
      await queryInterface.dropTable('SnapshotProposals', {
        transaction: t,
      });

      await queryInterface.addColumn(
        'Chains',
        'snapshot',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
        },
        { transaction: t }
      );

      await queryInterface.sequelize.query(
        `UPDATE "Chains" 
            SET snapshot = sn.snaps
          FROM (SELECT css.chain_id, array_agg(ss.snapshot_space) as snaps
                FROM "CommunitySnapshotSpaces" css
                INNER JOIN "SnapshotSpaces" ss ON css.snapshot_space_id = ss.snapshot_space
                GROUP BY css.chain_id  ) sn
          WHERE "Chains".id = sn.chain_id;`,
        { transaction: t }
      );

      await queryInterface.dropTable('CommunitySnapshotSpaces', {
        transaction: t,
      });
      await queryInterface.dropTable('SnapshotSpaces', { transaction: t });
      await queryInterface.bulkDelete(
        'NotificationCategories',
        {
          name: 'snapshot-proposal',
        },
        { transaction: t }
      );
      await queryInterface.dropTable('DiscordBotConfig', { transaction: t });
    });
  },
};
