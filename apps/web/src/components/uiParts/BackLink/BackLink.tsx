'use client';

import { ArrowBack } from '@mui/icons-material';
import { Link } from '@mui/material';
import type { FC } from 'react';

type Props = {
  href: string;
};

export const BackLink: FC<Props> = ({ href }) => {
  return (
    <Link
      color='inherit'
      sx={{
        textDecoration: 'none',
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        color: 'text.secondary',
        ':hover': {
          color: 'text.primary',
        },
      }}
      href={href}
    >
      <ArrowBack
        sx={{
          fontSize: '1rem',
          marginRight: '0.5rem',
        }}
      />
      一覧へ戻る
    </Link>
  );
};
