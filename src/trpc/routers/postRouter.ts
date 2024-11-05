import { z } from 'zod';
import { prismaClient } from '~/libs/PrismaClientSingleton';
import { createTRPCRouter, loginRequiredProcedure } from '~/trpc/init';

export const postRouter = createTRPCRouter({
  findByQuestionId: loginRequiredProcedure.input(z.object({ questionId: z.string() })).query(async ({ input, ctx }) => {
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
  create: loginRequiredProcedure
    .input(z.object({ body: z.string(), questionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const post = await prismaClient.post.create({
        data: {
          postType: 'USER',
          body: input.body,
          userId: ctx.user.id,
          questionId: input.questionId,
        },
      });

      return { post };
    }),
});
