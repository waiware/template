import { z } from 'zod';
import { prismaClient } from '~/libs/PrismaClientSingleton';
import { baseProcedure, createTRPCRouter } from '~/trpc/init';

export const postRouter = createTRPCRouter({
  findByQuestionId: baseProcedure
    .input(z.object({ questionId: z.string(), userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const posts = await prismaClient.post.findMany({
        where: {
          questionId: input.questionId,
          userId: ctx.user?.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return { posts };
    }),
});
