'use client';

import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function Custom500() {
  return (
    <Stack px={1}>
      <Stack py={3} px={1} rowGap={1}>
        <Typography variant='body1' textAlign='center' sx={{ fontWeight: 'bold' }}>
          エラーが発生しました
        </Typography>
        <Typography variant='body2' textAlign='center'>
          <Link href='/'>トップページに戻る</Link>
        </Typography>
      </Stack>
    </Stack>
  );
}
