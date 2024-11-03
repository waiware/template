'use client';

import { Container, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import type { FC } from 'react';

export const Navbar: FC = () => {
  const { palette } = useTheme();

  return (
    <Stack position='static' sx={{ borderBottom: props => `1px solid ${props.palette.divider}` }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <Typography
              variant='h6'
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                textDecoration: 'none',
                color: palette.text.primary,
              }}
            >
              サイコパスマスター
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </Stack>
  );
};
