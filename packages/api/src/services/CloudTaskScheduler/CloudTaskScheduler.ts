import { logger } from '../../libs/logger';
import type { ICloudTaskScheduler } from './ICloudTaskScheduler';

const { CloudTasksClient } = require('@google-cloud/tasks');
const client = new CloudTasksClient();

const project = 'wai-ware';
const queue = 'psychopath-queue';
const location = 'asia-northeast1';

const parent = client.queuePath(project, location, queue);

export class CloudTaskScheduler implements ICloudTaskScheduler {
  async enqueueTask<T>({
    domain,
    endpoint,
    scheduleDate,
    body,
  }: {
    domain: string;
    endpoint: string;
    scheduleDate: Date;
    body: T;
  }) {
    logger('Creating scheduled task', { domain, endpoint, scheduleDate, body });

    const apiHost = process.env.API_HOST || 'https://psychopath-master-api.wai-ware.com';

    const [response] = await client.createTask({
      parent,
      task: {
        httpRequest: {
          httpMethod: 'POST',
          url: `${apiHost}/trpc/${domain}.${endpoint}`,
          body: Buffer.from(JSON.stringify({ body })).toString('base64'),
          headers: {
            'Content-Type': 'application/json',
          },
          scheduleTime: {
            seconds: Math.floor(new Date(scheduleDate).getTime() / 1000),
          },
        },
      },
    });

    logger(`Created scheduled task ${response.name}`, { domain, endpoint, scheduleDate, body });
  }
}
