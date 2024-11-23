import type { PrismaClient } from '@prisma/client';
import { addMinutes } from 'date-fns';
import type { ICloudTaskScheduler } from '../../services/CloudTaskScheduler/ICloudTaskScheduler';

export class CreatePostUseCase {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly cloudTaskScheduler: ICloudTaskScheduler,
  ) {}

  async execute({ body, userId, questionId }: { body: string; userId: string; questionId: string }) {
    const post = await this.prismaClient.post.create({
      data: {
        postType: 'USER',
        body,
        userId,
        questionId,
      },
    });

    await this.cloudTaskScheduler.enqueueTask({
      endpoint: '/posts/generateReplyByBot',
      scheduleDate: addMinutes(new Date(), 1),
      body: {
        userId,
        questionId,
      },
    });

    return post;
  }
}
