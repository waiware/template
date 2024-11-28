import { Stack, Typography } from '@mui/material';
import { CreateQuestionForm } from './_components/CreateQuestionForm';

export default async function Page() {
  return (
    <Stack pt={3} px={1} rowGap={3}>
      <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
        新規作成
      </Typography>
      <CreateQuestionForm />
    </Stack>
  );
}
