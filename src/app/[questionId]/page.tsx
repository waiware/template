import { Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { trpc } from '~/trpc/server';

export default async function Page({ params }: { params: { questionId: string } }) {
  const { question } = await trpc.question.get({ id: params.questionId });

  if (!question) return notFound();

  return (
    <Stack pt={3} px={1} rowGap={3}>
      <Stack pt={3} px={1} rowGap={1}>
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          {question.title}
        </Typography>
        <Typography variant='body1' textAlign='center'>
          {question.body}
        </Typography>
      </Stack>
    </Stack>
  );
}
