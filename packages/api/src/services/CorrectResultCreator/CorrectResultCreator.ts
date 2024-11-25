import type { Answer, PrismaClient } from '@prisma/client';
import { differenceInSeconds } from 'date-fns';
import type { ICorrectResultCreator } from './ICorrectResultCreator';

export class CorrectResultCreator implements ICorrectResultCreator {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute({ answer }: { answer: Answer }) {
    const [firstPost, numberOfPosts] = await Promise.all([
      this.prismaClient.post.findFirst({
        where: {
          questionId: answer.questionId,
          userId: answer.userId,
          postType: 'USER',
        },
        orderBy: {
          createdAt: 'asc',
        },
      }),
      this.prismaClient.post.count({
        where: {
          questionId: answer.questionId,
          userId: answer.userId,
          postType: 'USER',
        },
      }),
    ]);

    if (!firstPost) throw new Error('firstPost not found');

    await this.prismaClient.correctResult.create({
      data: {
        answerId: answer.id,
        userId: answer.userId,
        questionId: answer.questionId,
        elapsedSeconds: differenceInSeconds(answer.createdAt, firstPost.createdAt),
        numberOfPosts,
      },
    });
  }
}
