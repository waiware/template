import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@repo/api';
import urlJoin from 'url-join';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: urlJoin(process.env.NEXT_PUBLIC_API_HOST || 'https://psychopath-master-api.wai-ware.com/', '/trpc'),
      fetch: async (input, init) => {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Credentials': 'true',
        };

        return fetch(input, {
          ...init,
          headers,
          credentials: 'include',
          next: { revalidate: 60 },
        });
      },
    }),
  ],
});
