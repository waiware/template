import type { Question } from '../domains';

export const createMockQuestion = (init: Partial<Question>): Question => {
  return {
    id: init.id || 'question1',
    title: init.title || 'title',
    body: init.body || 'body',
    answer: init.answer || 'answer',
    createdAt: init.createdAt || new Date(),
    updatedAt: init.updatedAt || new Date(),
  };
};
