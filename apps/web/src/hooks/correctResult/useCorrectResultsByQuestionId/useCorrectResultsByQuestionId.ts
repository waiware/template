import useSWR, { mutate } from 'swr';
import { findCorrectResultsByQuestionId } from '~/actions/correctResult';

const generateKey = (questionId: string) => ({ path: 'findCorrectResultsByQuestionId', questionId });

export const useCorrectResultsByQuestionId = ({ questionId }: { questionId: string }) => {
  return useSWR(generateKey(questionId), ({ questionId }) => findCorrectResultsByQuestionId({ questionId }));
};

export const mutateCorrectResultsByQuestionId = ({ questionId }: { questionId: string }) => {
  mutate(generateKey(questionId));
};
