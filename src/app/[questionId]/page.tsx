import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { AnswerBottomInput } from '~/components/models/AnswerBottomInput';
import { PostList } from '~/components/models/post/PostList';
import { QuestionInformation } from '~/components/models/question/QuestionInformation';
import { trpc } from '~/trpc/server';

type Props = { params: Promise<{ questionId: string }> };

export default async function Page({ params }: Props) {
  const { questionId } = await params;
  const { question } = await trpc.question.get({ id: questionId });

  if (!question) return notFound();

  return (
    <Stack px={1} rowGap={5}>
      <QuestionInformation question={question} />
      {/* localStorage に保存した userId を取得する */}
      <PostList questionId={questionId} userId='TODO' />
      <AnswerBottomInput />
    </Stack>
  );
}
