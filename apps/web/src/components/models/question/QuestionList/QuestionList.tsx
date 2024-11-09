'use client';

import { Link, Paper, Typography } from '@mui/material';
import type { FC } from 'react';
import { trpcClient } from '~/trpc/client';

export const QuestionList: FC = () => {
  const { data } = trpcClient.question.list.useQuery();

  return (data?.questions || []).map(v => {
    return (
      <Link key={v.id} href={`/${v.id}`} style={{ textDecoration: 'none' }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
          <Typography variant='h6'>{v.title}</Typography>
          <Typography
            variant='body1'
            textOverflow='ellipsis'
            overflow='hidden'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            {v.body}
          </Typography>
        </Paper>
      </Link>
    );
  });
};
