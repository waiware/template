import { Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { trpc } from '~/trpc/server';
import type { Question } from '~/types/modelSchema';

export default async function Home() {
  const { questions } = await trpc.question.list();

  return (
    <Stack pt={3} px={1} rowGap={3}>
      <Stack pt={3} px={1} rowGap={1}>
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          サイコパスマスター
        </Typography>
        <Typography variant='body1' textAlign='center'>
          サイコパス診断 × ウミガメのスープ
        </Typography>
      </Stack>
      {questions.map((v: Question) => {
        return (
          <Link key={v.id} href={`/${v.id}`} style={{ textDecoration: 'none' }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
              <Typography variant='h6'>{v.title}</Typography>
              <Typography
                variant='body1'
                textOverflow='ellipsis'
                overflow='hidden'
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                {v.body}
              </Typography>
            </Paper>
          </Link>
        );
      })}
    </Stack>
  );
}
