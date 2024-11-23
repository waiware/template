import { createMockPost } from '@repo/types';
import { prismaClient } from '../../libs/PrismaClientSingleton';
import { cleanUpAllTableForTest } from '../../test-utils/cleanUpAllTableForTest';
import { createPostsFixtures } from '../../test-utils/fixtures/createPostsFixtures';
import { GenerateReplyByBotUseCase } from './GenerateReplyByBotUseCase';

const generateReplyByBotUseCase = new GenerateReplyByBotUseCase(prismaClient);

describe('CreatePostUseCase', () => {
  beforeEach(async () => {
    await createPostsFixtures([
      createMockPost({ id: 'post1', questionId: 'question1', userId: 'user1', body: '質問です' }),
    ]);
  });
  afterEach(async () => {
    await cleanUpAllTableForTest();
  });
  describe('正常系', () => {
    it('質問を生成できる', async () => {
      // ACT
      await generateReplyByBotUseCase.execute({
        userId: 'user1',
        questionId: 'question1',
      });

      expect((await prismaClient.post.findMany({ where: { userId: 'user1', postType: 'USER' } })).length).toEqual(1);
      expect((await prismaClient.post.findMany({ where: { userId: 'user1', postType: 'BOT' } })).length).toEqual(1);
    });
  });
  describe('異常系', () => {
    it('質問が存在しない場合、エラーが発生する', async () => {
      // ACT
      await expect(generateReplyByBotUseCase.execute({ userId: 'user1', questionId: 'notExist1' })).rejects.toThrow(
        'Question not found',
      );
    });
  });
});
