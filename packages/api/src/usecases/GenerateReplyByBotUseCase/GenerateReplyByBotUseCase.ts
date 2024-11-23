import type { PrismaClient } from '@prisma/client';
const replys = ['はい', 'いいえ', 'わかりません', 'もう少し具体的に教えてください', 'どちらかといえばそう'];

export class GenerateReplyByBotUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute({ questionId, userId }: { questionId: string; userId: string }) {
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

    const reply = replys[Math.floor(Math.random() * replys.length)];

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
