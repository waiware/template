'use client';

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Box, Stack, Typography } from '@mui/material';
import type { Question } from '@repo/types';
import type { FC } from 'react';

type Props = {
  question: Question;
};

export const RankingPageInformation: FC<Props> = ({ question }) => {
  return (
    <Stack px={1} rowGap={1} sx={{ py: 3, borderBottom: props => `1px solid ${props.palette.divider}` }}>
      <Box display='flex' alignItems='center' justifyContent='center' columnGap={0.5}>
        <MilitaryTechIcon sx={{ color: props => props.palette.warning.main }} />
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          ランキング
        </Typography>
      </Box>
      <Typography variant='body1' textAlign='center'>
        「{question.title}」のランキングページです。
      </Typography>
    </Stack>
  );
};
