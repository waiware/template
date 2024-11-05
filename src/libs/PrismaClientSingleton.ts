import { PrismaClient as PrismaClientOrigin } from '@prisma/client';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const client: PrismaClientOrigin = (global as any).prismaClient || new PrismaClientOrigin();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
if (process.env.NODE_ENV !== 'production') (global as any).prismaClient = client;

export const prismaClient = client;
