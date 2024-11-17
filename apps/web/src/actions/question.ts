'use server';

import type { Question } from '@repo/types';
import { trpcClient } from '~/trpc/client';
import { convertStringsToDates } from '~/utils/convertStringsToDates';

export const getQuestion = async ({
  id,
}: {
  id: string;
}) => {
  const question = await trpcClient.question.get.query({
    id,
  });

  return question ? convertStringsToDates<Question>(question) : null;
};

export const listQuestions = async () => {
  const questions = await trpcClient.question.list.query();

  return questions.map<Question>(convertStringsToDates);
};
