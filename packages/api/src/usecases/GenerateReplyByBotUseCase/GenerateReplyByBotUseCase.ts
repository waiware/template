import type { PrismaClient } from '@prisma/client';
import type { IDifyClient } from '../../services/DifyClient/IDifyClient';

export class GenerateReplyByBotUseCase {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly difyClient: IDifyClient,
  ) {}

  async execute({ body, questionId, userId }: { body: string; questionId: string; userId: string }) {
    const questionWithPosts = await this.prismaClient.question.findFirst({
      where: {
        id: questionId,
      },
      include: {
        posts: {
          where: {
            userId,
          },
          select: {
            body: true,
          },
        },
      },
    });

    if (!questionWithPosts) {
      throw new Error('Question not found');
    }

    const reply = await this.difyClient.replyYesOrNo({
      post: body,
      questionTitle: questionWithPosts.title,
      questionBody: questionWithPosts.body,
      questionAnswer: questionWithPosts.answer,
      userId,
    });

    await this.prismaClient.post.create({
      data: {
        postType: 'BOT',
        body: reply,
        userId,
        questionId,
      },
    });
  }
}
