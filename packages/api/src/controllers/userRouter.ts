import z from 'zod';
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
  updateCurrentUserName: protectedProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, input }) => {
    return prismaClient.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        name: input.name,
      },
    });
  }),
});
