import { type Post, createMockQuestion, createMockUser } from '@repo/types';
import { prismaClient } from '../../libs/PrismaClientSingleton';

export const createPostsFixtures = async (posts: Post[]) => {
  for (const { questionId, userId, ...post } of posts) {
    await prismaClient.post.create({
      data: {
        ...post,
        question: {
          connectOrCreate: {
            where: { id: questionId },
            create: createMockQuestion({ id: questionId }),
          },
        },
        user: {
          connectOrCreate: {
            where: { id: userId },
            create: createMockUser({ id: userId }),
          },
        },
      },
    });
  }
};
