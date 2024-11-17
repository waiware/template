'use client';

import type { Post } from '@repo/types';
import { trpcClient } from '~/trpc/client';
import { convertStringsToDates } from '~/utils/convertStringsToDates';

export const findPostsByQuestionId = async ({
  questionId,
}: {
  questionId: string;
}) => {
  const posts = await trpcClient.post.findByQuestionId.query({
    questionId,
  });

  return posts.map<Post>(convertStringsToDates);
};
