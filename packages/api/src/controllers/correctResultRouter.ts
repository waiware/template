import { z } from 'zod';
import { prismaClient } from '../libs/PrismaClientSingleton';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const correctResultRouter = router({
  findByQuestionId: protectedProcedure.input(z.object({ questionId: z.string() })).query(async ({ ctx, input }) => {
    const correctResult = await prismaClient.correctResult.findFirst({
      where: {
        questionId: input.questionId,
        userId: ctx.user.id,
      },
      include: {
        answer: true,
      },
    });

    return correctResult;
  }),
  list: publicProcedure.input(z.object({ questionId: z.string() })).query(async ({ input }) => {
    const correctResultsWithUser = await prismaClient.correctResult.findMany({
      where: {
        questionId: input.questionId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        elapsedSeconds: 'asc',
      },
    });

    return correctResultsWithUser;
  }),
});
