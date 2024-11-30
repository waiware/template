import { Stack, Typography } from '@mui/material';
import { CreateQuestionForm } from './_components/CreateQuestionForm';
import { PageSubNavigation } from './_components/PageSubNavigation';

export default async function Page() {
  return (
    <Stack px={1} rowGap={3}>
      <PageSubNavigation />
      <Stack pb={3} rowGap={3}>
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          新規作成
        </Typography>
        <CreateQuestionForm />
      </Stack>
    </Stack>
  );
}
