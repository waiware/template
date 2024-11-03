import { createTRPCRouter } from '~/trpc/init';
import { questionRouter } from './questionRouter';

export const appRouter = createTRPCRouter({
  question: questionRouter,
});

export type AppRouter = typeof appRouter;
