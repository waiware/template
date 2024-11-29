import { createMockPost, createMockQuestion, createMockUser } from '@repo/types';

import { prismaClient } from '../../libs/PrismaClientSingleton';

import { CorrectResultCreator } from '../../services/CorrectResultCreator';

import { cleanUpAllTableForTest } from '../../test-utils/cleanUpAllTableForTest';
import { createPostsFixtures } from '../../test-utils/fixtures/createPostsFixtures';
import { createQuestionsFixtures } from '../../test-utils/fixtures/createQuestionsFixtures';
import { createUsersFixtures } from '../../test-utils/fixtures/createUsersFixtures';

import { DifyClient } from '../../services/DifyClient';
import { CreateAnswerUseCase } from './CreateAnswerUseCase';

const correctResultCreator = new CorrectResultCreator(prismaClient);
const difyClient = new DifyClient();
const createAnswerUseCase = new CreateAnswerUseCase(prismaClient, correctResultCreator, difyClient);
const correctResultCreatorSpy = jest.spyOn(correctResultCreator, 'execute').mockImplementation();

describe('CreatePostUseCase', () => {
  beforeEach(async () => {
    await createUsersFixtures([createMockUser({ id: 'user1' })]);
    await createQuestionsFixtures([createMockQuestion({ id: 'question1' })]);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await cleanUpAllTableForTest();
  });
  describe('正常系', () => {
    describe('回答が正解の場合、', () => {
      it('答えに紐づく質問を元に経過時間を算出し、回答結果データを生成する', async () => {
        const judgeAnswerSpy = jest.spyOn(difyClient, 'judgeAnswer').mockImplementation(async () => 'true');
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

        expect(judgeAnswerSpy).toHaveBeenCalled();
        expect(correctResultCreatorSpy).toHaveBeenCalled();
      });
    });

    describe('回答が不正解の場合、', () => {
      it('答えに紐づく質問を元に経過時間を算出し、回答結果データを生成する', async () => {
        const judgeAnswerSpy = jest.spyOn(difyClient, 'judgeAnswer').mockImplementation(async () => 'false');
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

        expect(judgeAnswerSpy).toHaveBeenCalled();
        expect(correctResultCreatorSpy).not.toHaveBeenCalled();
      });
    });
  });
});
