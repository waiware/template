import { Box, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuestion } from '~/actions/question';
import { BackLink } from '~/components/uiParts/BackLink/BackLink';
import { generateMetadataObject } from '~/utils/generateMetadataObject';
import { PostList } from '../../components/models/post/PostList';
import { QuestionInformation } from '../../components/models/question/QuestionInformation';
import { DisplayResultOrAnswerButton } from './_components/DisplayResultOrAnswerButton';

type Props = { params: Promise<{ questionId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { questionId } = await params;
  const question = await getQuestion({ id: questionId });

  return generateMetadataObject({
    title: question?.title,
    url: `https://psychopath-master.wai-ware.com/${questionId}`,
    description: question?.body,
  });
}

export default async function Page({ params }: Props) {
  const { questionId } = await params;
  const question = await getQuestion({ id: questionId });
  if (!question) return notFound();

  return (
    <Stack px={1}>
      <Box py={1}>
        <BackLink href='/' />
      </Box>
      <Stack rowGap={5}>
        <QuestionInformation question={question} />
        <Stack rowGap={3} pb='240px'>
          <PostList question={question} />
          <DisplayResultOrAnswerButton question={question} />
        </Stack>
        {/* <AnswerBottomInputWrapper question={question}>
          <AnswerBottomInput questionId={questionId} />
        </AnswerBottomInputWrapper> */}
      </Stack>
    </Stack>
  );
}
