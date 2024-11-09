import { z } from 'zod';
import { prismaClient } from '../../libs/PrismaClientSingleton';
import { baseProcedure, createTRPCRouter } from '../../trpc/init';
import type { Question } from '../../types/modelSchema';

export const questionRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const questions = await prismaClient.question.findMany();

    return {
      questions,
    };
  }),
  get: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }): Promise<{ question: Question | null }> => {
      const question = await prismaClient.question.findFirst({
        where: {
          id: input.id,
        },
      });

      return { question };
    }),
});
