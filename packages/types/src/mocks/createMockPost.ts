import type { Post } from '../domains';

export const createMockPost = (init: Partial<Post>): Post => {
  return {
    id: init.id || 'post1',
    body: init.body || 'body',
    postType: init.postType || 'USER',
    userId: init.userId || 'user1',
    questionId: init.questionId || 'question1',
    createdAt: init.createdAt || new Date(),
    updatedAt: init.updatedAt || new Date(),
  };
};
