import type { PrismaClient } from '@prisma/client';
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
      body: {
        userId,
        questionId,
      },
    });

    return post;
  }
}
