'use client';

import type { User } from '@repo/types';
import { trpcClient } from '~/trpc/client';
import { convertStringsToDates } from '~/utils/convertStringsToDates';

export const getCurrentUser = async () => {
  const user = await trpcClient.user.getCurrentUser.query();

  return user ? convertStringsToDates<User>(user) : null;
};
