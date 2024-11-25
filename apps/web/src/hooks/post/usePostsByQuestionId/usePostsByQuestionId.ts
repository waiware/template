import type { Post } from '@repo/types';
import useSWR, { mutate } from 'swr';
import { findPostsByQuestionId } from '~/actions/post';

const generateKey = (questionId: string) => ({ path: 'findPostsByQuestionId', questionId });

export const usePostsByQuestionId = ({ questionId, fallbackData }: { questionId: string; fallbackData?: Post[] }) => {
  return useSWR(generateKey(questionId), ({ questionId }) => findPostsByQuestionId({ questionId }), {
    fallbackData,
    refreshInterval: 1000,
  });
};

export const mutatePostsByQuestionId = ({ questionId }: { questionId: string }) => {
  mutate(generateKey(questionId));
};
