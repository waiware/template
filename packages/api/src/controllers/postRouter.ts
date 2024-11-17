import { z } from 'zod';
import { prismaClient } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';

export const postRouter = router({
  findByQuestionId: protectedProcedure.input(z.object({ questionId: z.string() })).query(async ({ ctx, input }) => {
    const posts = await prismaClient.post.findMany({
      where: {
        questionId: input.questionId,
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return posts;
  }),
  create: protectedProcedure
    .input(z.object({ body: z.string(), questionId: z.string() }))
    .mutation(async ({ input }) => {
      const post = await prismaClient.post.create({
        data: {
          postType: 'USER',
          body: input.body,
          // userId: ctx.user.id,
          userId: 'TODO',
          questionId: input.questionId,
        },
      });

      return post;
    }),
});
