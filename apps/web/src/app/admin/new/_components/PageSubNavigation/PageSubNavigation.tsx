'use client';

import { Box } from '@mui/material';
import type { FC } from 'react';
import { BackLink } from '~/components/uiParts/BackLink';

export const PageSubNavigation: FC = () => {
  return (
    <Box py={1} display='flex' alignItems='center' justifyContent='space-between'>
      <BackLink href={'/admin'} />
    </Box>
  );
};
