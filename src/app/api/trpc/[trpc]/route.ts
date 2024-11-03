import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '~/trpc/init';
import { appRouter } from '~/trpc/routers/root';

/**
 * Client-Side からの tRPC 問い合わせは, fetch, XHR を介して http(s) 送信され、全てこの Route Handler でまとめて処理される.
 */
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };