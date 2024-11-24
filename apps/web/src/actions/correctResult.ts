'use client';

import { trpcClient } from '~/trpc/client';
import { convertStringsToDates } from '~/utils/convertStringsToDates';

export const findCorrectResultByQuestionId = async ({
  questionId,
}: {
  questionId: string;
}) => {
  const correctResult = await trpcClient.correctResult.findByQuestionId.query({
    questionId,
  });

  return correctResult ? convertStringsToDates(correctResult) : null;
};
