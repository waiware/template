import type { User } from '@prisma/client';
import { prismaClient } from '../../libs/PrismaClientSingleton';

export const createUsersFixtures = async (users: User[]) => {
  for (const user of users) {
    await prismaClient.user.create({
      data: user,
    });
  }
};
