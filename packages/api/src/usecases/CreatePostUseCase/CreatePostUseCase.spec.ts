import { createMockQuestion, createMockUser } from '@repo/types';
import { prismaClient } from '../../libs/PrismaClientSingleton';
import { cleanUpAllTableForTest } from '../../test-utils/cleanUpAllTableForTest';

import { createQuestionsFixtures } from '../../test-utils/fixtures/createQuestionsFixtures';
import { createUsersFixtures } from '../../test-utils/fixtures/createUsersFixtures';

import { CloudTaskScheduler } from '../../services/CloudTaskScheduler';
import { CreatePostUseCase } from './CreatePostUseCase';

const cloudTaskScheduler = new CloudTaskScheduler();
const createPostUseCase = new CreatePostUseCase(prismaClient, cloudTaskScheduler);

describe('CreatePostUseCase', () => {
  beforeEach(async () => {
    await createUsersFixtures([createMockUser({ id: 'user1' })]);
    await createQuestionsFixtures([createMockQuestion({ id: 'question1' })]);
  });
  afterEach(async () => {
    await cleanUpAllTableForTest();
  });
  describe('正常系', () => {
    it('質問を生成し、Botの回答をリクエストする。', async () => {
      const enqueueTaskSpy = jest.spyOn(cloudTaskScheduler, 'enqueueTask').mockImplementation();
      // ACT
      await createPostUseCase.execute({
        body: 'Example',
        userId: 'user1',
        questionId: 'question1',
      });

      expect(await prismaClient.post.findFirst({ where: { userId: 'user1' } })).toEqual(
        expect.objectContaining({ body: 'Example' }),
      );
      expect(enqueueTaskSpy).toHaveBeenCalled();
    });
  });
});
