import type { Question } from '@repo/types';
import { z } from 'zod';
import { prismaClient } from '../libs/PrismaClientSingleton';
import { publicProcedure, router } from '../trpc';

export const questionRouter = router({
  list: publicProcedure.query(async () => {
    const questions = await prismaClient.question.findMany();

    return {
      questions,
    };
  }),
  get: publicProcedure
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
