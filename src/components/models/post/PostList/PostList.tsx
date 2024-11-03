'use client';

import { Lightbulb } from '@mui/icons-material';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { trpc } from '~/trpc/client';

type Props = {
  questionId: string;
  userId: string;
};

export const PostList: FC<Props> = ({ questionId, userId }) => {
  const { data, isLoading } = trpc.post.findByQuestionId.useQuery({
    questionId,
    userId,
  });

  if (isLoading) {
    return (
      <Stack display='flex' flexDirection='row' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack rowGap={3} pb='200px'>
      {(data?.posts || []).map(post => (
        <Box
          key={post.id}
          sx={{
            background: '#fefefe',
            py: 1,
            px: 2,
            borderRadius: '15px',
            width: '80%',
            marginLeft: post.postType === 'BOT' ? 'none' : 'auto',
          }}
        >
          <Typography variant='body2'>{post.body}</Typography>
        </Box>
      ))}
      {data?.posts.length !== 0 && (
        <Button
          variant='text'
          color='info'
          sx={{ fontWeight: 'bold', width: '60%', mx: 'auto' }}
          startIcon={<Lightbulb />}
        >
          答える
        </Button>
      )}
    </Stack>
  );
};
