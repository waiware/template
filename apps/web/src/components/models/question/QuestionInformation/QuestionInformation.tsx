'use client';

import { Stack, Typography } from '@mui/material';
import type { Question } from '@repo/types';
import type { FC } from 'react';

type Props = {
  question: Question;
};

export const QuestionInformation: FC<Props> = ({ question }) => {
  return (
    <Stack px={1} rowGap={1} sx={{ py: 3, borderBottom: props => `1px solid ${props.palette.divider}` }}>
      <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
        {question?.title}
      </Typography>
      <Typography variant='body1' textAlign='center'>
        {question?.body}
      </Typography>
    </Stack>
  );
};
