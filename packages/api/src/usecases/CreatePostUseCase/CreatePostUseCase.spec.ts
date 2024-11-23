import { prismaClient } from '../../libs/PrismaClientSingleton';
import { cleanUpAllTableForTest } from '../../test-utils/cleanUpAllTableForTest';
import { CreatePostUseCase } from './CreatePostUseCase';

const createPostUseCase = new CreatePostUseCase(prismaClient);

describe('CreatePostUseCase', () => {
  beforeEach(async () => {
    await prismaClient.user.create({ data: { id: 'user1', name: 'User1' } });
    await prismaClient.question.create({ data: { id: 'question1', title: 'title', body: 'body' } });
  });
  afterEach(async () => {
    await cleanUpAllTableForTest();
  });
  describe('正常系', () => {
    it('質問を生成できる', async () => {
      await createPostUseCase.execute({
        body: 'Example',
        userId: 'user1',
        questionId: 'question1',
      });

      expect(await prismaClient.post.findFirst({ where: { userId: 'user1' } })).toEqual(
        expect.objectContaining({ body: 'Example' }),
      );
    });
  });
});
