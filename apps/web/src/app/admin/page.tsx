import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { listQuestionsForAdmin } from '~/actions/question';
import { QuestionListForAdmin } from '~/components/models/question/QuestionListForAdmin';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const questionsForAdmin = await listQuestionsForAdmin();

  return (
    <Stack py={3} px={1} rowGap={3}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          管理画面
        </Typography>
        <Link href='/admin/new'>
          <Button variant='contained'>新規作成</Button>
        </Link>
      </Box>
      <QuestionListForAdmin questions={questionsForAdmin} />
    </Stack>
  );
}
