import { type CorrectResult, createMockAnswer, createMockQuestion, createMockUser } from '@repo/types';
import { prismaClient } from '../../libs/PrismaClientSingleton';

export const createCorrectResultsFixtures = async (correctResults: CorrectResult[]) => {
  for (const { questionId, userId, answerId, ...correctResult } of correctResults) {
    await prismaClient.correctResult.create({
      data: {
        ...correctResult,
        question: {
          connectOrCreate: {
            where: { id: questionId },
            create: createMockQuestion({ id: questionId }),
          },
        },
        user: {
          connectOrCreate: {
            where: { id: userId },
            create: createMockUser({ id: userId }),
          },
        },
        answer: {
          connectOrCreate: {
            where: { id: answerId },
            create: createMockAnswer({ id: answerId }),
          },
        },
      },
    });
  }
};
