'use client';

import { Link, Paper, Typography } from '@mui/material';
import type { Question } from '@repo/types';
import type { FC } from 'react';

type Props = {
  questions: Question[];
};
export const QuestionList: FC<Props> = ({ questions }) => {
  return (questions || []).map(v => {
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
