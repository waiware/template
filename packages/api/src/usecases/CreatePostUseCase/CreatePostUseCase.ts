import type { PrismaClient } from '@prisma/client';

export class CreatePostUseCase {
  constructor(private readonly prismaClient: PrismaClient) {}

  async execute({ body, userId, questionId }: { body: string; userId: string; questionId: string }) {
    const post = await this.prismaClient.post.create({
      data: {
        postType: 'USER',
        body,
        userId,
        questionId,
      },
    });

    return post;
  }
}
