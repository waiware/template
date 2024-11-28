import { type Question, QuestionSchema } from '@repo/types';
import { z } from 'zod';
import { prismaClient } from '../libs/PrismaClientSingleton';
import { publicProcedure, router } from '../trpc';

export const questionRouter = router({
  create: publicProcedure
    .input(
      QuestionSchema.pick({
        title: true,
        body: true,
        answer: true,
        publishedAt: true,
      }),
    )
    .mutation(async ({ input }) => {
      return await prismaClient.question.create({
        data: {
          title: input.title,
          body: input.body,
          answer: input.answer,
          publishedAt: input.publishedAt,
        },
      });
    }),
  list: publicProcedure.query(async () => {
    return await prismaClient.question.findMany({
      where: {
        publishedAt: {
          lte: new Date(),
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });
  }),
  listForAdmin: publicProcedure.query(async () => {
    const questions = await prismaClient.question.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        correctResults: {
          select: {
            id: true,
          },
        },
      },
    });

    return questions.map(({ correctResults, ...v }) => ({ ...v, correctResultsCount: correctResults.length }));
  }),
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }): Promise<Question | null> => {
    const question = await prismaClient.question.findFirst({
      where: {
        id: input.id,
      },
    });

    return question;
  }),
});
