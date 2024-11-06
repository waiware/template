import { createTRPCRouter } from '~/trpc/init';
import { postRouter } from './postRouter';
import { questionRouter } from './questionRouter';

export const appRouter = createTRPCRouter({
  post: postRouter,
  question: questionRouter,
});

export type AppRouter = typeof appRouter;
