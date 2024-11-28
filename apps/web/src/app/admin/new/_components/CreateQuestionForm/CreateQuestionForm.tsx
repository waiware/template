'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { type FC, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { mutateCurrentUser } from '~/hooks/user/useCurrentUser/useCurrentUser';
import { trpcClient } from '~/trpc/client';

const inputSchema = z.object({
  title: z.string().min(1, { message: '1文字以上入力してください' }),
  body: z.string().min(1, { message: '1文字以上入力してください' }),
  answer: z.string().min(1, { message: '1文字以上入力してください' }),
  publishedAt: z.date(),
});
type InputState = z.infer<typeof inputSchema>;

export const CreateQuestionForm: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { control, formState, handleSubmit } = useForm<InputState>({
    defaultValues: {
      title: '',
      body: '',
      answer: '',
      publishedAt: new Date(),
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ title, body, answer, publishedAt }) => {
    startTransition(async () => {
      await trpcClient.question.create.mutate({ title, body, answer, publishedAt });

      mutateCurrentUser();
      enqueueSnackbar('問題を作成しました', { variant: 'success' });
      router.push('/admin');
    });
  });

  return (
    <Stack rowGap={3}>
      <Stack rowGap={1}>
        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
          タイトル
        </Typography>
        <Controller
          name='title'
          control={control}
          render={({ field, formState }) => (
            <TextField
              {...field}
              placeholder='タイトルを入力してください'
              variant='outlined'
              fullWidth
              error={Boolean(formState.errors.title)}
              helperText={formState.errors.title?.message}
              sx={{ '.MuiInputBase-root': { background: 'white' } }}
            />
          )}
        />
      </Stack>
      <Stack rowGap={1}>
        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
          問題
        </Typography>
        <Controller
          name='body'
          control={control}
          render={({ field, formState }) => (
            <TextField
              {...field}
              placeholder='問題を入力してください'
              variant='outlined'
              fullWidth
              multiline
              minRows={4}
              error={Boolean(formState.errors.body)}
              helperText={formState.errors.body?.message}
              sx={{ '.MuiInputBase-root': { background: 'white' } }}
            />
          )}
        />
      </Stack>
      <Stack rowGap={1}>
        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
          真相
        </Typography>
        <Controller
          name='answer'
          control={control}
          render={({ field, formState }) => (
            <TextField
              {...field}
              placeholder='真相を入力してください'
              variant='outlined'
              fullWidth
              multiline
              minRows={4}
              error={Boolean(formState.errors.answer)}
              helperText={formState.errors.answer?.message}
              sx={{ '.MuiInputBase-root': { background: 'white' } }}
            />
          )}
        />
      </Stack>
      <Stack rowGap={1}>
        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
          投稿日
        </Typography>
        <Controller
          name='publishedAt'
          control={control}
          render={({ field, formState }) => (
            <TextField
              {...field}
              value={format(field.value, 'yyyy-MM-dd')}
              onChange={e => field.onChange(new Date(e.target.value))}
              placeholder='真相を入力してください'
              variant='outlined'
              type='date'
              fullWidth
              error={Boolean(formState.errors.publishedAt)}
              helperText={formState.errors.publishedAt?.message}
              sx={{ '.MuiInputBase-root': { background: 'white' } }}
            />
          )}
        />
      </Stack>
      <Button
        variant='contained'
        color='primary'
        sx={{ fontWeight: 'bold' }}
        onClick={onSubmit}
        disabled={isPending || !formState.isValid}
      >
        保存
      </Button>
    </Stack>
  );
};
