import { CreatePostUseCase } from './CreatePostUseCase';

const createPostUseCase = new CreatePostUseCase(jestPrisma.client);

describe('CreatePostUseCase', () => {
  beforeEach(async () => {
    await jestPrisma.client.user.create({ data: { id: 'user1', name: 'User1' } });
  });
  describe('正常系', () => {
    it('質問を生成できる', async () => {
      await createPostUseCase.execute({
        body: 'Example',
        userId: 'user1',
        questionId: 'question1',
      });

      expect(await jestPrisma.client.post.findFirst({ where: { userId: 'user1' } })).toEqual(
        expect.objectContaining({ body: 'Example' }),
      );
    });
  });
});
