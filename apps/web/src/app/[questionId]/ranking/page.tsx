import { Box, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuestion } from '~/actions/question';
import { BackLink } from '~/components/uiParts/BackLink/BackLink';
import { generateMetadataObject } from '~/utils/generateMetadataObject';
import { RankingPageInformation } from './_components/RankingPageInformation';

type Props = { params: Promise<{ questionId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { questionId } = await params;
  const question = await getQuestion({ id: questionId });

  return generateMetadataObject({
    title: `${question?.title}のランキング`,
    url: `https://psychopath-master.wai-ware.com/${questionId}/ranking`,
    description: `${question?.title}のランキングページです`,
  });
}

export default async function Page({ params }: Props) {
  const { questionId } = await params;
  const question = await getQuestion({ id: questionId });
  if (!question) return notFound();

  return (
    <Stack px={1}>
      <Box py={1}>
        <BackLink href={`/${question.id}`} text='問題に戻る' />
      </Box>
      <Stack rowGap={5}>
        <RankingPageInformation question={question} />
      </Stack>
    </Stack>
  );
}
