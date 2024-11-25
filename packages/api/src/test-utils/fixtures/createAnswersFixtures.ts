import { type Answer, createMockQuestion, createMockUser } from '@repo/types';
import { prismaClient } from '../../libs/PrismaClientSingleton';

export const createAnswersFixtures = async (answers: Answer[]) => {
  for (const { questionId, userId, ...answer } of answers) {
    await prismaClient.answer.create({
      data: {
        ...answer,
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
      },
    });
  }
};
