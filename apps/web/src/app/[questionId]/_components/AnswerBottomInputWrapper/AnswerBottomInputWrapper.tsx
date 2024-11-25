'use client';

import type { FC, ReactNode } from 'react';

import type { Question } from '@repo/types';
import { useCorrectResultByQuestionId } from '~/hooks/correctResult/useCorrectResultByQuestionId';

type Props = {
  question: Question;
  children: ReactNode;
};

export const AnswerBottomInputWrapper: FC<Props> = ({ question, children }) => {
  const { data: correctResult, isLoading: isLoadingCorrectResult } = useCorrectResultByQuestionId({
    questionId: question.id,
  });

  if (isLoadingCorrectResult) return null;
  if (!isLoadingCorrectResult && correctResult) return null;

  return children;
};
