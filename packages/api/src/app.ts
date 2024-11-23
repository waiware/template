import * as trpcExpress from '@trpc/server/adapters/express';
import { json, urlencoded } from 'body-parser';
import cookie from 'cookie-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { v4 } from 'uuid';
import { answerRouter } from './controllers/answerRouter';
import { postRouter } from './controllers/postRouter';
import { questionRouter } from './controllers/questionRouter';
import { logger } from './libs/logger';
import { createContext, router } from './trpc';

config();

const appRouter = router({
  answer: answerRouter,
  post: postRouter,
  question: questionRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();

if (!process.env.SESSION_SECRET || !process.env.DATABASE_URL) {
  throw new Error('Please set env variables SESSION_SECRET and DATABASE_URL');
}

app.use(cookieParser());
app.use(cookie());
app.use(express.json());
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use((req, res, next) => {
  let userId = req.cookies.userId || null;
  if (!userId) {
    // Cookie がない場合は新規の userId を生成
    userId = v4();
  }

  logger('Cookiesを出力します', {
    cookies: req.cookies,
    userId,
    env: process.env,
  });

  res.cookie('userId', userId, {
    domain: process.env.MAIN_DOMAIN,
    maxAge: 400 * 24 * 60 * 60 * 1000, // クッキーの有効期限(msec) 400日
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  next();
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export default app;
