import type { PrismaClient } from '@prisma/client';
import type { ICorrectResultCreator } from '../../services/CorrectResultCreator/ICorrectResultCreator';

export class CreateAnswerUseCase {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly correctResultCreator: ICorrectResultCreator,
  ) {}

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

    if (isCorrect) {
      await this.correctResultCreator.execute({ answer });
    }

    return answer;
  }
}
