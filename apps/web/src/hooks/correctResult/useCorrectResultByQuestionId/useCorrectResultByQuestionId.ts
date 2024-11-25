import useSWR, { mutate } from 'swr';
import { findCorrectResultByQuestionId } from '~/actions/correctResult';

const generateKey = (questionId: string) => ({ path: 'findCorrectResultByQuestionId', questionId });

export const useCorrectResultByQuestionId = ({ questionId }: { questionId: string }) => {
  return useSWR(generateKey(questionId), ({ questionId }) => findCorrectResultByQuestionId({ questionId }));
};

export const mutateCorrectResultByQuestionId = ({ questionId }: { questionId: string }) => {
  mutate(generateKey(questionId));
};
