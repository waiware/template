import type { Question } from '@prisma/client';
import { prismaClient } from '../../libs/PrismaClientSingleton';

export const createQuestionsFixtures = async (questions: Question[]) => {
  for (const question of questions) {
    await prismaClient.question.create({ data: question });
  }
};
