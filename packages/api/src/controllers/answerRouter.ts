import { z } from 'zod';
import { prismaClient } from '../libs/PrismaClientSingleton';
import { CorrectResultCreator } from '../services/CorrectResultCreator';
import { DifyClient } from '../services/DifyClient';
import { protectedProcedure, router } from '../trpc';
import { CreateAnswerUseCase } from '../usecases/CreateAnswerUseCase';

const createAnswerUseCase = new CreateAnswerUseCase(
  prismaClient,
  new CorrectResultCreator(prismaClient),
  new DifyClient(),
);

export const answerRouter = router({
  answer: protectedProcedure
    .input(z.object({ answerBody: z.string(), questionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const post = await createAnswerUseCase.execute({
        body: input.answerBody,
        userId: ctx.user.id,
        questionId: input.questionId,
      });

      return post;
    }),
});
