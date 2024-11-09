import { initTRPC } from '@trpc/server';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

/**
 * tRPC 応答時に参照できるコンテキストの生成関数.
 */
export const createContext = async ({ req: _req }: CreateHTTPContextOptions) => {
  return { user: null };
  // const cookieStore = await cookies();
  // const userStore = cookieStore.get('userId');
  // const userId = userStore?.value || null;

  // if (!userId) return { user: null };

  // const user = userId
  //   ? await prismaClient.user.findFirst({
  //       where: {
  //         id: userId,
  //       },
  //     })
  //   : await prismaClient.user.create({
  //       data: {
  //         id: userId,
  //         name: 'ゲスト',
  //       },
  //     });

  // return {
  //   user,
  // };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new Error('Unauthorized');
    }
    return next({
      ctx: {
        user: ctx.user,
      },
    });
  }),
);
