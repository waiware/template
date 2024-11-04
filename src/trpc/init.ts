import { initTRPC } from '@trpc/server';
import { cookies } from 'next/headers';

/**
 * tRPC 応答時に参照できるコンテキストの生成関数.
 */
export const createTRPCContext = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get('userId');
  const userId = user?.value || null;

  return {
    userId,
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
