import { prismaClient } from '../libs/PrismaClientSingleton';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return prismaClient.user.findFirst({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
