import models from 'server/database';
import Sequelize from 'sequelize';
import { ThreadInstance } from 'server/models/thread';
import { CommentInstance } from 'server/models/comment';
import { UserInstance } from 'server/models/user';
import { AddressInstance } from 'server/models/address';
import { ChainInstance } from 'server/models/chain';
import { CollaborationAttributes } from 'server/models/collaboration';
import { ReactionAttributes } from 'server/models/reaction';
import { ChainNodeAttributes } from 'server/models/chain_node';
import { TopicAttributes } from 'server/models/topic';
import { ProfileAttributes } from '../../../../server/models/profile';

const Op = Sequelize.Op;

export let testThreads: ThreadInstance[];
export let testComments: CommentInstance[];
export let testUsers: UserInstance[];
export let testAddresses: AddressInstance[];
export let testChains: ChainInstance[];
export let testCollaborations: CollaborationAttributes[];
export let testReactions: ReactionAttributes[];
export let testChainNodes: ChainNodeAttributes[];
export let testTopics: TopicAttributes[];
export let testProfiles: ProfileAttributes[];

before(async () => {
  await models.Topic.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Reaction.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Collaboration.destroy({ where: { thread_id: { [Op.lt]: 0 } }, force: true });
  await models.User.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Thread.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Comment.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Address.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Chain.destroy({ where: { chain_node_id: { [Op.lt]: 0 } }, force: true });
  await models.Profile.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });

  testUsers = await Promise.all([...Array(2).keys()].map(
    async (i) => (await models.User.findOrCreate({
      where: {
        id: -i - 1,
        email: `test${i - 1}@gmail.com`,
        emailVerified: true,
        isAdmin: true,
        lastVisited: '{}',
      }
    }))[0]));

  testProfiles = await Promise.all([...Array(2).keys()].map(
    async (i) => (await models.Profile.findOrCreate({
      where: {
        id: -i - 1,
        email: `test${i - 1}@gmail.com`,
        user_id: -i - 1,
      }
    }))[0]));

  testChainNodes = [
    (await models.ChainNode.findOrCreate({
      where: {
        id: -1,
        url: 'test1',
        balance_type: 'cmntest',
        name: 'TestName1'
      }
    }))[0],
    (await models.ChainNode.findOrCreate({
      where: {
        id: -2,
        url: 'test2',
        balance_type: 'cmntest',
        name: 'TestName2'
      }
    }))[0]
  ];

  testChains = [(await models.Chain.findOrCreate({
    where: {
      id: 'cmntest',
      chain_node_id: -1,
      name: 'cmntest',
      network: 'cmntest',
      type: 'offchain',
      default_symbol: 'cmntest',
    }
  }))[0],
    (await models.Chain.findOrCreate({
      where: {
        id: 'cmntest2',
        chain_node_id: -2,
        name: 'cmntest2',
        network: 'cmntest',
        type: 'offchain',
        default_symbol: 'cmntest2',
      }
    }).catch(e => console.log(e)))[0]
  ];

  testTopics = [(await models.Topic.findOrCreate({
    where: {
      id: -1,
      name: 'testTopic',
      chain_id: 'cmntest',
    }
  }))[0],
    (await models.Topic.findOrCreate({
      where: {
        id: -2,
        name: 'testTopic2',
        chain_id: 'cmntest',
      }
    }))[0]
  ];

  testAddresses = await Promise.all([...Array(2).keys()].map(
    async (i) => (await models.Address.findOrCreate({
      where: {
        id: -i - 1,
        address: `testAddress${-i - 1}`,
        chain: 'cmntest',
        verification_token: '',
        profile_id: -i - 1,
      }
    }))[0]));

  testThreads = await Promise.all([...Array(2).keys()].map(
    async (i) => (await models.Thread.findOrCreate({
      where: {
        id: -i - 1,
        address_id: -1,
        title: '',
        body: '',
        chain: 'cmntest',
        topic_id: -1,
        kind: 'discussion',
      }
    }))[0]));

  testThreads.push(...await Promise.all([...Array(3).keys()].map(
    async (i) => (await models.Thread.findOrCreate({
      where: {
        id: -i - 1 - 2,
        address_id: -2,
        title: '',
        body: '',
        chain: 'cmntest',
        topic_id: -2,
        kind: 'discussion',
      }
    }))[0])));

  testCollaborations = await Promise.all([...Array(2).keys()].map(
    async (i) => (await models.Collaboration.findOrCreate({
      where: {
        thread_id: -1,
        address_id: -i - 1,
      }
    }))[0]));

  testComments = await Promise.all([...Array(2).keys()].map(
    async (i) => (await models.Comment.findOrCreate({
      where: {
        id: -i - 1,
        chain: 'cmntest',
        address_id: -1,
        text: '',
        root_id: 'discussion_-1',
        plaintext: '',
      }
    }))[0]));

  testComments.push(...await Promise.all([...Array(3).keys()].map(
    async (i) => (await models.Comment.findOrCreate({
      where: {
        id: -i - 1 - 2,
        chain: 'cmntest',
        address_id: -2,
        text: '',
        root_id: 'discussion_-2',
        plaintext: '',
      }
    }))[0])));

  testReactions = await Promise.all([...Array(2).keys()].map(
    async (i) => (await models.Reaction.findOrCreate({
      where: {
        id: -i - 1,
        reaction: 'like',
        address_id: -1,
        thread_id: -1,
        chain: 'cmntest',
      }
    }))[0]));

  testReactions.push(...await Promise.all([...Array(3).keys()].map(
    async (i) => (await models.Reaction.findOrCreate({
      where: {
        id: -i - 1 - 2,
        reaction: 'like',
        address_id: -2,
        comment_id: -2,
        chain: 'cmntest',
      }
    }))[0])));
});

after(async () => {
  await models.Topic.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Reaction.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Collaboration.destroy({ where: { thread_id: { [Op.lt]: 0 } }, force: true });
  await models.User.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Thread.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Comment.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Address.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Chain.destroy({ where: { chain_node_id: { [Op.lt]: 0 } }, force: true });
  await models.ChainNode.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
  await models.Profile.destroy({ where: { id: { [Op.lt]: 0 } }, force: true });
});