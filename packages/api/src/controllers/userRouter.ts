import { prismaClient } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await prismaClient.question.findFirst({
      where: {
        id: ctx.user.id,
      },
    });

    return currentUser;
  }),
});
