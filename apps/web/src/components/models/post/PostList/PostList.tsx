'use client';

import { Lightbulb } from '@mui/icons-material';
import { Box, Button, CircularProgress, Stack, Typography, keyframes } from '@mui/material';
import type { FC } from 'react';
import { trpcClient } from '../../../../trpc/client';

type Props = {
  questionId: string;
};

const fadeAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const PostList: FC<Props> = ({ questionId }) => {
  const { data, isLoading } = trpcClient.post.findByQuestionId.useQuery({
    questionId,
  });

  if (isLoading) {
    return (
      <Stack display='flex' flexDirection='row' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }
  const isUserPostLast = data?.posts[data.posts.length - 1]?.postType === 'USER';

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
      {data?.posts.length === 0 && (
        <Typography variant='body2' sx={{ textAlign: 'center', color: 'gray' }}>
          Yes or No で回答できる質問をしよう！
        </Typography>
      )}
      {isUserPostLast && (
        <Box sx={{ py: 1, px: 2 }}>
          <Typography
            variant='body2'
            sx={{
              textAlign: 'left',
              color: 'gray',
              fontWeight: 'bold',
              animation: `${fadeAnimation} 1s ease-in-out infinite alternate`,
            }}
          >
            回答生成中...
          </Typography>
        </Box>
      )}
      {/* 質問中の時は表示しない */}
      {!isUserPostLast && data?.posts.length !== 0 && (
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
