import type { PrismaClient } from '@prisma/client';
const replys = [
  'はい、そうです',
  'いいえ、違います',
  'その通りです',
  '違います',
  'はい、もちろんです',
  'いいえ、絶対に違います',
  'はい、そう思います',
  'いいえ、そうは思いません',
  'はい、確かに',
  'いいえ、全く違います',
  'はい、間違いありません',
  'いいえ、そうではありません',
  'はい、そうですね',
  'いいえ、そうではないです',
  'はい、そうかもしれません',
  'いいえ、そうではないかもしれません',
  'はい、そうですか',
  'いいえ、そうではないですか',
  'はい、そうだと思います',
  'いいえ、そうではないと思います',
];

export class GenerateReplyByBotUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute({ questionId, userId }: { questionId: string; userId: string }) {
    await new Promise(resolve => setTimeout(resolve, 1000));
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
