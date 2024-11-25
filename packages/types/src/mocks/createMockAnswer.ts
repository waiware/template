import type { Answer } from '../domains';

export const createMockAnswer = (init: Partial<Answer>): Answer => {
  return {
    id: init.id || 'answer1',
    body: init.body || 'body',
    userId: init.userId || 'user1',
    isCorrect: init.isCorrect || false,
    isJudging: init.isJudging || false,
    questionId: init.questionId || 'question1',
    createdAt: init.createdAt || new Date(),
    updatedAt: init.updatedAt || new Date(),
  };
};
