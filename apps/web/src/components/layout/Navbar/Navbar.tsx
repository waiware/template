'use client';

import { Settings as SettingsIcon } from '@mui/icons-material';
import { Container, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import type { FC } from 'react';

export const Navbar: FC = () => {
  const { palette } = useTheme();

  return (
    <Stack
      position='static'
      sx={{
        background: '#fff',
        borderBottom: props => `1px solid ${props.palette.divider}`,
      }}
    >
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
          <Link href='/settings' style={{ textDecoration: 'none', color: '#333' }}>
            <SettingsIcon />
          </Link>
        </Toolbar>
      </Container>
    </Stack>
  );
};
