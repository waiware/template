import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '~/trpc/init';

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      // zod による入力バリデーション.
      z.object({
        text: z.string(),
      }),
    )
    .query(opts => {
      // tRPC API 応答の実装.
      return {
        // コンテキスト `ctx` と入力 `input` を参照できる.
        greeting: `hello ${opts.ctx.userId}, ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
