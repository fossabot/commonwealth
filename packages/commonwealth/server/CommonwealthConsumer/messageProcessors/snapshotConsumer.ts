import axios from 'axios';
import { factory, formatFilename } from 'common-common/src/logging';
import { SnapshotNotification } from '../../../shared/types';
import { DB } from '../../models';
import { StatsDController } from 'common-common/src/statsd';

export async function processSnapshotMessage(
  this: { models: DB },
  data: SnapshotNotification
) {
  const log = factory.getLogger(formatFilename(__filename));
  const { space, id, title, body, choices, start, expire } = data;

  log.info(`Processed message: `);
  log.info(JSON.stringify(data));

  const eventType = data.event;

  try {
    let proposal = await this.models.SnapshotProposal.findOne({
      where: { id: data.id },
    });

    await this.models.SnapshotSpace.findOrCreate({
      where: { snapshot_space: space },
    });

    if (eventType === 'proposal/created' && proposal) {
      log.error(`Proposal already exists, cannot create`);
      return;
    }

    if (!proposal) {
      proposal = await this.models.SnapshotProposal.create({
        id,
        title,
        body,
        choices,
        space,
        start,
        expire,
      });
    }

    StatsDController.get().increment('cw.created_snapshot_proposal_record', 1, {
      event: eventType,
      space,
    });

    if (eventType === 'proposal/deleted') {
      log.info(`Proposal deleted, deleting record`);
      await proposal.destroy();

      StatsDController.get().increment(
        'cw.deleted_snapshot_proposal_record',
        1,
        {
          event: eventType,
          space,
        }
      );
    }
  } catch (e) {
    log.info("Yeeee haw 1")
    log.error(e);
  }

  let associatedCommunities;

  try {
    associatedCommunities = await this.models.CommunitySnapshotSpaces.findAll({
      where: { snapshot_space_id: space },
    });

    log.info(`Found ${associatedCommunities.length} associated communities`);
  } catch (e) {
    log.info("Yeee haw 2")
    log.error(e);
  }

  for (const community of associatedCommunities) {
    const communityId = community.chain_id;
    const communityDiscordConfig = await this.models.DiscordBotConfig.findAll({
      where: {
        chain_id: communityId,
      },
    });

    log.info('Found discord config');

    for (const config of communityDiscordConfig) {
      if (config.snapshot_channel_id) {
        // Pass data to Discord bot
        try {
          log.info(`Sending snapshot notification to discord bot`);
          await axios.post(
            `${process.env.DISCORD_BOT_URL}/send-snapshot-notification`,
            {
              snapshotNotificationData: {
                space,
                id,
                title,
                body,
                choices,
                start,
                expire,
              },
              guildId: config.guild_id,
              channelId: config.snapshot_channel_id,
              eventType,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
              },
            }
          );
        } catch (e) {
          // TODO: should we NACK the message if sending to discord fails or just rollbar report it and continue?
          console.log('Error sending snapshot notification to discord bot', e);
        }
      }
    }
  }
}
