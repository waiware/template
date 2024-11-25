'use client';

import type { Answer, CorrectResult } from '@repo/types';
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
