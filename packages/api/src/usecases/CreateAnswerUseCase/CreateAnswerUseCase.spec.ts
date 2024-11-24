import { createMockPost, createMockQuestion, createMockUser } from '@repo/types';

import { prismaClient } from '../../libs/PrismaClientSingleton';

import { CorrectResultCreator } from '../../services/CorrectResultCreator';

import { cleanUpAllTableForTest } from '../../test-utils/cleanUpAllTableForTest';
import { createPostsFixtures } from '../../test-utils/fixtures/createPostsFixtures';
import { createQuestionsFixtures } from '../../test-utils/fixtures/createQuestionsFixtures';
import { createUsersFixtures } from '../../test-utils/fixtures/createUsersFixtures';

import { CreateAnswerUseCase } from './CreateAnswerUseCase';

const correctResultCreator = new CorrectResultCreator(prismaClient);
const createAnswerUseCase = new CreateAnswerUseCase(prismaClient, correctResultCreator);

describe('CreatePostUseCase', () => {
  beforeEach(async () => {
    await createUsersFixtures([createMockUser({ id: 'user1' })]);
    await createQuestionsFixtures([createMockQuestion({ id: 'question1' })]);
  });

  afterEach(async () => {
    await cleanUpAllTableForTest();
  });
  describe('正常系', () => {
    it('答えに紐づく質問を元に経過時間を算出し、回答結果データを生成する', async () => {
      // ARRANGE
      await createPostsFixtures([createMockPost({ questionId: 'question1' })]);

      // ACT
      await createAnswerUseCase.execute({ body: '答え', userId: 'user1', questionId: 'question1' });

      expect(await prismaClient.answer.findFirst({ where: { userId: 'user1' } })).toEqual(
        expect.objectContaining({
          body: '答え',
          questionId: 'question1',
        }),
      );

      // TODO 答えによってcorrectResultCreatorの実行有無を確認
    });
  });
});
