import { z } from 'zod';
import { prismaClient } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';

export const correctResultRouter = router({
  findByQuestionId: protectedProcedure.input(z.object({ questionId: z.string() })).query(async ({ ctx, input }) => {
    const correctResult = await prismaClient.correctResult.findFirst({
      where: {
        questionId: input.questionId,
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        answer: true,
      },
    });

    return correctResult;
  }),
});
