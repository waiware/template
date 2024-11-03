'use client';

import { Button, Stack, TextField } from '@mui/material';
import type { FC } from 'react';

import { ChatBubble } from '@mui/icons-material';

export const AnswerBottomInput: FC = () => {
  return (
    <Stack
      position='fixed'
      bottom={0}
      width='100%'
      left={0}
      p={2}
      rowGap={1}
      bgcolor='white'
      sx={{ boxShadow: theme => theme.shadows[1] }}
    >
      <TextField multiline rows={2} variant='outlined' fullWidth />
      <Button variant='contained' color='primary' fullWidth sx={{ fontWeight: 'bold' }} startIcon={<ChatBubble />}>
        質問する
      </Button>
    </Stack>
  );
};
