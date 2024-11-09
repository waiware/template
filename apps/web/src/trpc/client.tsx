'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'api';
import type React from 'react';
import { useState } from 'react';
import urlJoin from 'url-join';

export const trpcClient: ReturnType<typeof createTRPCReact<AppRouter>> = createTRPCReact<AppRouter>();

/**
 * Client-Side (SPA) 向けの tRPC client.
 */

/**
 * TRPC Provider (wrapper component) for layout.tsx.
 */
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [_trpcClient] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: urlJoin(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080', '/trpc'),
        }),
      ],
    }),
  );

  return (
    <trpcClient.Provider client={_trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcClient.Provider>
  );
}
