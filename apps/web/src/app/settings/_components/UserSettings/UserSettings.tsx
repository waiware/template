'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import type { User } from '@repo/types';
import { useSnackbar } from 'notistack';
import { type FC, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { mutateCurrentUser, useCurrentUser } from '~/hooks/user/useCurrentUser/useCurrentUser';
import { trpcClient } from '~/trpc/client';

const inputSchema = z.object({
  name: z
    .string()
    .min(1, { message: '名前は1文字以上入力してください' })
    .max(32, { message: '名前は50文字以内で入力してください' }),
});
type InputState = z.infer<typeof inputSchema>;

export const UserSettings: FC = () => {
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();

  if (isLoadingCurrentUser) {
    return (
      <Stack display='flex' flexDirection='row' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }

  if (!currentUser) {
    return null;
  }

  return <UserSettingsCore currentUser={currentUser} />;
};

export const UserSettingsCore: FC<{ currentUser: User }> = ({ currentUser }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();

  const { control, formState, handleSubmit } = useForm<InputState>({
    defaultValues: {
      name: currentUser?.name || '',
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ name }) => {
    startTransition(async () => {
      await trpcClient.user.updateCurrentUserName.mutate({
        name: name.trim(),
      });

      mutateCurrentUser();
      enqueueSnackbar('名前を更新しました', { variant: 'success' });
    });
  });

  return (
    <Stack rowGap={1}>
      <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
        名前
      </Typography>
      <Box display='flex'>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              defaultValue={currentUser?.name}
              placeholder='名前を入力してください'
              variant='outlined'
              fullWidth
              error={Boolean(formState.errors.name)}
              helperText={formState.errors.name?.message}
              sx={{ '.MuiInputBase-root': { background: 'white' } }}
            />
          )}
        />
      </Box>
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
