import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { cookies } from 'next/headers';
import { v4 } from 'uuid';
import { createTRPCContext } from '~/trpc/init';
import { appRouter } from '~/trpc/routers/root';

/**
 * Client-Side からの tRPC 問い合わせは, fetch, XHR を介して http(s) 送信され、全てこの Route Handler でまとめて処理される.
 */
const handler = async (req: Request) => {
  const cookieStore = await cookies();
  const user = cookieStore.get('userId');

  let userId = user?.value || null;

  if (!userId) {
    // Cookie がない場合は新規の userId を生成
    userId = v4();
  }

  cookieStore.set('userId', userId, {
    httpOnly: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 400, // ブラウザ最大の有行為期限である400日に設定
  });

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
};

export { handler as GET, handler as POST };
