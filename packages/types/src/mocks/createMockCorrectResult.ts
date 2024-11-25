import type { CorrectResult } from '../domains';

export const createMockCorrectResult = (init: Partial<CorrectResult>): CorrectResult => {
  return {
    id: init.id || 'answer1',
    userId: init.userId || 'user1',
    questionId: init.questionId || 'question1',
    answerId: init.answerId || 'answer1',
    elapsedSeconds: init.elapsedSeconds || 0,
    numberOfPosts: init.numberOfPosts || 0,
    createdAt: init.createdAt || new Date(),
    updatedAt: init.updatedAt || new Date(),
  };
};
