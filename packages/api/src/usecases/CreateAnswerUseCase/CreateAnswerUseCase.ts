import type { PrismaClient } from '@prisma/client';

export class CreateAnswerUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute({ body, userId, questionId }: { body: string; userId: string; questionId: string }) {
    // TODO: 回答をDifyに問い合わせる
    const isCorrect = Math.random() > 0.3;
    // 時間がかかることの再現。実際に問い合わせるようになったら削除
    await new Promise(resolve => setTimeout(resolve, 3000));

    const answer = await this.prismaClient.answer.create({
      data: {
        body,
        userId,
        isCorrect,
        questionId,
      },
    });

    return answer;
  }
}
