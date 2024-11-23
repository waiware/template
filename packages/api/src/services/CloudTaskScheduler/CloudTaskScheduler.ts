import { logger } from '../../libs/logger';
import type { ICloudTaskScheduler } from './ICloudTaskScheduler';

export class CloudTaskScheduler implements ICloudTaskScheduler {
  async enqueueTask<T>({
    domain,
    endpoint,
    scheduleDate,
    body,
  }: {
    domain: string;
    endpoint: string;
    scheduleDate?: Date;
    body: T;
  }) {
    logger('Creating scheduled task', { domain, endpoint, scheduleDate, body });

    const apiHost = process.env.API_HOST || 'https://psychopath-master-api.wai-ware.com';
    const urlJoin = require('url-join');
    const url = urlJoin(apiHost, endpoint);

    if (process.env.NODE_ENV === 'development') {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } else {
      const CloudTasksClient = require('@google-cloud/tasks');
      const client = new CloudTasksClient();

      const project = 'wai-ware';
      const queue = 'psychopath-queue';
      const location = 'asia-northeast1';

      const parent = client.queuePath(project, location, queue);

      const [response] = await client.createTask({
        parent,
        task: {
          httpRequest: {
            httpMethod: 'POST',
            url,
            body: Buffer.from(JSON.stringify(body)).toString('base64'),
            headers: {
              'Content-Type': 'application/json',
            },
            scheduleTime: scheduleDate
              ? {
                  seconds: Math.floor(new Date(scheduleDate).getTime() / 1000),
                }
              : undefined,
          },
        },
      });

      logger(`Created scheduled task ${response.name}`, { domain, endpoint, scheduleDate, body });
    }
  }
}
