import type { User } from '../domains';

export const createMockUser = (init: Partial<User>): User => {
  return {
    id: init.id || 'user1',
    name: init.name || 'mock-user-name',
    createdAt: init.createdAt || new Date(),
    updatedAt: init.updatedAt || new Date(),
  };
};
