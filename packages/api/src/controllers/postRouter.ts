import { z } from 'zod';
import { prismaClient } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';
import { CreatePostUseCase } from '../usecases/CreatePostUseCase';

const createPostUseCase = new CreatePostUseCase(prismaClient);

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
    .mutation(async ({ input, ctx }) => {
      const post = await createPostUseCase.execute({
        body: input.body,
        userId: ctx.user.id,
        questionId: input.questionId,
      });

      return post;
    }),
});
