import { createMockAnswer, createMockPost } from '@repo/types';

import { prismaClient } from '../../libs/PrismaClientSingleton';

import { cleanUpAllTableForTest } from '../../test-utils/cleanUpAllTableForTest';
import { createAnswersFixtures } from '../../test-utils/fixtures/createAnswersFixtures';
import { createPostsFixtures } from '../../test-utils/fixtures/createPostsFixtures';

import { CorrectResultCreator } from './CorrectResultCreator';

const correctResultCreator = new CorrectResultCreator(prismaClient);

describe('CreatePostUseCase', () => {
  const answer = createMockAnswer({ questionId: 'question1', userId: 'user1' });

  beforeEach(async () => {
    await createAnswersFixtures([answer]);
  });

  afterEach(async () => {
    await cleanUpAllTableForTest();
  });
  describe('正常系', () => {
    it('答えに紐づく質問を元に経過時間を算出し、回答結果データを生成する', async () => {
      // ARRANGE
      await createPostsFixtures([createMockPost({ questionId: 'question1' })]);

      // ACT
      await correctResultCreator.execute({ answer });

      expect(await prismaClient.correctResult.findFirst({ where: { userId: 'user1' } })).toEqual(
        expect.objectContaining({
          questionId: answer.questionId,
          elapsedSeconds: expect.any(Number),
          numberOfPosts: 1,
        }),
      );
    });
  });
  describe('異常系', () => {
    it('質問が一つも存在しない場合、エラーが発生する', async () => {
      // ACT
      await expect(correctResultCreator.execute({ answer })).rejects.toThrow('firstPost not found');
    });
  });
});
