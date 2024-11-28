import { Stack, Typography } from '@mui/material';
import { listQuestionsForAdmin } from '~/actions/question';
import { QuestionListForAdmin } from '~/components/models/question/QuestionListForAdmin';

export default async function Page() {
  const questionsForAdmin = await listQuestionsForAdmin();

  return (
    <Stack pt={3} px={1} rowGap={3}>
      <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
        管理画面
      </Typography>
      <QuestionListForAdmin questions={questionsForAdmin} />
    </Stack>
  );
}
