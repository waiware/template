import { prismaClient } from '~/libs/PrismaClientSingleton';
import { baseProcedure, createTRPCRouter } from '~/trpc/init';

export const questionRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const questions = await prismaClient.question.findMany();

    return {
      questions,
    };
  }),
});
