import { initTRPC } from '@trpc/server';
import { cookies } from 'next/headers';
import { prismaClient } from '~/libs/PrismaClientSingleton';

/**
 * tRPC 応答時に参照できるコンテキストの生成関数.
 */
export const createTRPCContext = async () => {
  const cookieStore = await cookies();
  const userStore = cookieStore.get('userId');
  const userId = userStore?.value || null;

  if (!userId) return { user: null };

  const user = userId
    ? await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      })
    : await prismaClient.user.create({
        data: {
          id: userId,
          name: 'ゲスト',
        },
      });

  return {
    user,
  };
};

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createTRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
