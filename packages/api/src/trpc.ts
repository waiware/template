import { initTRPC } from '@trpc/server';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { prismaClient } from './libs/PrismaClientSingleton';
import { logger } from './libs/logger';

function getUserIdFromCookie(cookieString: string) {
  const cookies = cookieString.split('; ').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies.userId || null;
}

/**
 * tRPC 応答時に参照できるコンテキストの生成関数.
 */
export const createContext = async ({ req }: CreateHTTPContextOptions) => {
  const userId = req.headers.cookie ? getUserIdFromCookie(req.headers.cookie) : null;
  logger('userId', { userId, cookie: req.headers.cookie });

  if (!userId) return { user: null };

  let user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    user = await prismaClient.user.create({
      data: {
        id: userId,
        name: 'ゲスト',
      },
    });
  }

  return {
    user,
  };
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
