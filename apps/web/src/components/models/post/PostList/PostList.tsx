'use client';

import { Box, CircularProgress, Stack, Typography, keyframes } from '@mui/material';
import type { Question } from '@repo/types';
import type { FC } from 'react';
import { usePostsByQuestionId } from '~/hooks/post/usePostsByQuestionId/usePostsByQuestionId';
import { AnswerButton } from '../../answer/AnswerButton';

type Props = {
  question: Question;
};

const fadeAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const PostList: FC<Props> = ({ question }) => {
  const { data: posts, isLoading } = usePostsByQuestionId({
    questionId: question.id,
  });

  if (!posts && isLoading) {
    return (
      <Stack display='flex' flexDirection='row' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }
  const isUserPostLast = (posts || [])[(posts || []).length - 1]?.postType === 'USER';

  return (
    <Stack rowGap={3} pb='240px'>
      {(posts || []).map(post => (
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
      {(posts || []).length === 0 && (
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
      {!isUserPostLast && (posts || []).length !== 0 && <AnswerButton question={question} />}
    </Stack>
  );
};
