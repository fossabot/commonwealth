import { RabbitMQController, getRabbitMQConfig } from 'common-common/src/rabbitmq';
import {
  RabbitMQSubscription,
  ServiceConsumer,
} from 'common-common/src/serviceConsumer';
import { BrokerConfig } from 'rascal';
import { factory, formatFilename } from 'common-common/src/logging';
import { RascalSubscriptions } from 'common-common/src/rabbitmq/types';
import Rollbar from "rollbar";
import {RABBITMQ_URI, ROLLBAR_SERVER_TOKEN} from '../config';
import { processChainEntityCUD } from './messageProcessors/chainEntityCUDQueue';
import models from '../database';
import { processChainEventNotificationsCUD } from './messageProcessors/chainEventNotificationsCUDQueue';
import {processChainEventTypeCUD} from "./messageProcessors/chainEventTypeCUDQueue";
import {processSnapshotMessage} from "./messageProcessors/snapshotConsumer";

const log = factory.getLogger(formatFilename(__filename));

export async function setupCommonwealthConsumer(): Promise<ServiceConsumer> {
  const rollbar = new Rollbar({
    accessToken: ROLLBAR_SERVER_TOKEN,
    environment: process.env.NODE_ENV,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  let rmqController: RabbitMQController;
  try {
    rmqController = new RabbitMQController(
      <BrokerConfig>getRabbitMQConfig(RABBITMQ_URI),
      rollbar
    );
    await rmqController.init();
  } catch (e) {
    log.error(
      'Rascal consumer setup failed. Please check the Rascal configuration'
    );
    rollbar.critical('Rascal consumer setup failed. Please check the Rascal configuration', e);
    throw e;
  }
  const context = {
    models,
    log,
  };

  const chainEntityCUDProcessorRmqSub: RabbitMQSubscription = {
    messageProcessor: processChainEntityCUD,
    subscriptionName: RascalSubscriptions.ChainEntityCUDMain,
    msgProcessorContext: context,
  };

  const ceNotifsCUDProcessorRmqSub: RabbitMQSubscription = {
    messageProcessor: processChainEventNotificationsCUD,
    subscriptionName: RascalSubscriptions.ChainEventNotificationsCUDMain,
    msgProcessorContext: context,
  };

  const ceTypeCUDProcessorRmqSub: RabbitMQSubscription = {
    messageProcessor: processChainEventTypeCUD,
    subscriptionName: RascalSubscriptions.ChainEventTypeCUDMain,
    msgProcessorContext: context,
  };

  const snapshotEventProcessorRmqSub: RabbitMQSubscription = {
    messageProcessor: processSnapshotMessage,
    subscriptionName: RascalSubscriptions.SnapshotListener,
    msgProcessorContext: context
  }

  const subscriptions: RabbitMQSubscription[] = [
    chainEntityCUDProcessorRmqSub,
    ceNotifsCUDProcessorRmqSub,
    ceTypeCUDProcessorRmqSub,
    snapshotEventProcessorRmqSub
  ];

  const serviceConsumer = new ServiceConsumer(
    'MainConsumer',
    rmqController,
    subscriptions
  );
  await serviceConsumer.init();

  log.info(
    `Consumer started. Name: ${serviceConsumer.serviceName}, id: ${serviceConsumer.serviceId}`
  );

  return serviceConsumer;
}

async function main() {
  try {
    log.info('Starting main consumer');
    await setupCommonwealthConsumer();
  } catch (error) {
    log.fatal('Consumer setup failed', error);
  }
}

if (process.argv[2] === 'run-as-script') {
  main();
}
