import { Stack, Typography } from '@mui/material';
import { CreateQuestionForm } from './_components/CreateQuestionForm';
import { PageSubNavigation } from './_components/PageSubNavigation';

export default async function Page() {
  return (
    <Stack px={1} rowGap={3} minHeight='calc(100vh - 56px)' maxWidth='500px' mx='auto'>
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
