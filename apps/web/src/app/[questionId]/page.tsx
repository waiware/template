import { Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuestion } from '~/actions/question';
import { generateMetadataObject } from '~/utils/generateMetadataObject';
import { AnswerBottomInput } from '../../components/models/post/AnswerBottomInput';
import { PostList } from '../../components/models/post/PostList';
import { QuestionInformation } from '../../components/models/question/QuestionInformation';
import { AnswerBottomInputWrapper } from './_components/AnswerBottomInputWrapper';
import { DisplayResultOrAnswerButton } from './_components/DisplayResultOrAnswerButton';
import { PageSubNavigation } from './_components/PageSubNavigation';

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
    <Stack height='calc(100vh - 56px)' overflow='scroll'>
      <Stack px={1} flex={1}>
        <PageSubNavigation question={question} />
        <Stack rowGap={5} pb={3}>
          <QuestionInformation question={question} />
          <Stack rowGap={3}>
            <PostList question={question} />
            <DisplayResultOrAnswerButton question={question} />
          </Stack>
        </Stack>
      </Stack>
      <AnswerBottomInputWrapper question={question}>
        <AnswerBottomInput questionId={questionId} />
      </AnswerBottomInputWrapper>
    </Stack>
  );
}
