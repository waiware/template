'use client';

import type { Answer, CorrectResult, User } from '@repo/types';
import { trpcClient } from '~/trpc/client';
import { convertStringsToDates } from '~/utils/convertStringsToDates';

export const findCorrectResultByQuestionId = async ({
  questionId,
}: {
  questionId: string;
}) => {
  const correctResultWithAnswer = await trpcClient.correctResult.findByQuestionId.query({
    questionId,
  });

  return correctResultWithAnswer
    ? convertStringsToDates<CorrectResult & { answer: Answer }>(correctResultWithAnswer)
    : null;
};

export const findCorrectResultsByQuestionId = async ({
  questionId,
}: {
  questionId: string;
}) => {
  const correctResults = await trpcClient.correctResult.list.query({
    questionId,
  });

  return correctResults.map(convertStringsToDates<CorrectResult & { user: User }>);
};
