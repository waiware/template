'use client';

import type { FC } from 'react';

import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import type { Question } from '@repo/types';
import { useCorrectResultsByQuestionId } from '~/hooks/correctResult/useCorrectResultsByQuestionId';
import { formatSecondsToDisplayTime } from '~/utils/formatSecondsToDisplayTime';

type Props = {
  question: Question;
};

export const CorrectResultRanking: FC<Props> = ({ question }) => {
  const { data: correctResults, isLoading } = useCorrectResultsByQuestionId({
    questionId: question.id,
  });

  if (isLoading) {
    return (
      <Stack display='flex' flexDirection='row' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack rowGap={1}>
      {correctResults?.map((correctResult, index) => (
        <Paper
          key={correctResult.id}
          sx={{ py: 1, px: 2, borderRadius: 2, border: props => `${props.palette.divider} 1px solid` }}
          square
          elevation={0}
        >
          <Stack>
            <Box display='flex' columnGap={2} alignItems='baseline'>
              <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
                {index + 1}位
              </Typography>
              <Typography variant='body1'>{correctResult.user.name}</Typography>
            </Box>
            <Box display='flex' columnGap={2} alignItems='center'>
              <Typography variant='caption' color='textSecondary' width='50%'>
                回答時間 {formatSecondsToDisplayTime(correctResult.elapsedSeconds)}
              </Typography>
              <Typography variant='caption' color='textSecondary' width='50%'>
                質問回数 {correctResult.numberOfPosts}回
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};
