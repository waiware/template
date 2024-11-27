'use client';

import type { FC } from 'react';

import { Box, Chip, CircularProgress, Link, Paper, Stack, Typography } from '@mui/material';
import type { Question } from '@repo/types';
import { useCorrectResultsByQuestionId } from '~/hooks/correctResult/useCorrectResultsByQuestionId';
import { useCurrentUser } from '~/hooks/user/useCurrentUser/useCurrentUser';
import { formatSecondsToDisplayTime } from '~/utils/formatSecondsToDisplayTime';

type Props = {
  question: Question;
};

export const CorrectResultRanking: FC<Props> = ({ question }) => {
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { data: correctResults, isLoading: isLoadingCorrectResults } = useCorrectResultsByQuestionId({
    questionId: question.id,
  });

  if (isLoadingCorrectResults || isLoadingCurrentUser) {
    return (
      <Stack display='flex' flexDirection='row' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack rowGap={1}>
      {correctResults?.map((correctResult, index) => {
        const isCurrentUserResult = correctResult.userId === currentUser?.id;
        return (
          <Paper
            key={correctResult.id}
            sx={{
              py: 1,
              px: 2,
              borderRadius: 2,
              border: props =>
                isCurrentUserResult ? `${props.palette.primary.main} 2px solid` : `${props.palette.divider} 2px solid`,
            }}
            square
            elevation={0}
          >
            <Stack>
              <Box display='flex' columnGap={2} alignItems='center'>
                <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
                  {index + 1}位
                </Typography>
                <Box display='flex' columnGap={1} alignItems='center'>
                  <Typography variant='body1'>{correctResult.user.name}</Typography>
                  {isCurrentUserResult && <Chip color='primary' size='small' label='You' sx={{ fontWeight: 'bold' }} />}
                  {currentUser?.name === 'ゲスト' && (
                    <Link
                      sx={{ textDecoration: 'none', width: 'fit-content', ':hover': { opacity: 0.7 } }}
                      href='/settings'
                    >
                      <Typography variant='caption' textAlign='center'>
                        名前を変更する
                      </Typography>
                    </Link>
                  )}
                </Box>
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
        );
      })}
    </Stack>
  );
};
