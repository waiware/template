'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField } from '@mui/material';
import type { FC } from 'react';

import { ChatBubble } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { mutatePostsByQuestionId, usePostsByQuestionId } from '~/hooks/post/usePostsByQuestionId/usePostsByQuestionId';
import { trpcClient } from '~/trpc/server';

const inputSchema = z.object({ body: z.string().min(1) });
type InputState = z.infer<typeof inputSchema>;

type Props = {
  questionId: string;
};

export const AnswerBottomInput: FC<Props> = ({ questionId }) => {
  const { data: posts = [] } = usePostsByQuestionId({
    questionId,
  });

  const isUserPostLast = posts[posts.length - 1]?.postType === 'USER';

  const { control, reset, formState, handleSubmit } = useForm<InputState>({
    defaultValues: {
      body: '',
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ body }) => {
    await trpcClient.post.create.mutate({ body, questionId });
    reset();
    mutatePostsByQuestionId({ questionId });
    await new Promise(resolve => setTimeout(resolve, 300));
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  });

  return (
    <Stack
      position='fixed'
      bottom={0}
      width='100%'
      left={0}
      p={2}
      bgcolor='white'
      sx={{ boxShadow: theme => theme.shadows[1] }}
    >
      <Stack width='100%' maxWidth='500px' mx='auto' rowGap={1}>
        <Controller
          name='body'
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline placeholder='質問を入力する...' rows={2} variant='outlined' fullWidth />
          )}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={onSubmit}
          fullWidth
          sx={{ fontWeight: 'bold' }}
          startIcon={<ChatBubble />}
          disabled={isUserPostLast || !formState.isValid}
        >
          質問する
        </Button>
      </Stack>
    </Stack>
  );
};
