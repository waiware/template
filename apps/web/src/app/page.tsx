import { Stack, Typography } from '@mui/material';
import { QuestionList } from '~/components/models/question/QuestionList';

export default async function Home() {
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
      <QuestionList />
    </Stack>
  );
}
