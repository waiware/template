'use client';

import { Box, Link, Paper, Typography } from '@mui/material';
import type { Question } from '@repo/types';
import { format } from 'date-fns';
import type { FC } from 'react';

type Props = {
  questions: (Question & {
    correctResultsCount: number;
  })[];
};

export const QuestionListForAdmin: FC<Props> = ({ questions }) => {
  return (questions || []).map(v => {
    return (
      <Link key={v.id} href={`/${v.id}/ranking`} style={{ textDecoration: 'none' }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
          <Typography variant='h6'>{v.title}</Typography>
          <Box display='flex'>
            <Box width='50%'>
              <Typography variant='body2'>投稿日時：{format(v.publishedAt, 'yyyy-MM-dd HH:mm')}</Typography>
            </Box>
            <Box width='50%'>
              <Typography variant='body2'>正答件数：{v.correctResultsCount} 件</Typography>
            </Box>
          </Box>
        </Paper>
      </Link>
    );
  });
};
