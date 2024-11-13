'use server';

import type { Post } from '@repo/types';
import { trpcClient } from '~/trpc/server';
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
