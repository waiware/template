import type { PrismaClient } from '@prisma/client';
import type { ICorrectResultCreator } from '../../services/CorrectResultCreator/ICorrectResultCreator';
import type { IDifyClient } from '../../services/DifyClient/IDifyClient';

export class CreateAnswerUseCase {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly correctResultCreator: ICorrectResultCreator,
    private readonly difyClient: IDifyClient,
  ) {}

  async execute({ body, userId, questionId }: { body: string; userId: string; questionId: string }) {
    const question = await this.prismaClient.question.findFirst({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    const result = await this.difyClient.judgeAnswer({
      answer: body,
      questionTitle: question.title,
      questionBody: question.body,
      questionAnswer: question.answer,
    });

    const isCorrect = result === 'true';
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
