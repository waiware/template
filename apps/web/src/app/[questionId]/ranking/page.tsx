import { Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuestion } from '~/actions/question';
import { Footer } from '~/components/layout/Footer';
import { generateMetadataObject } from '~/utils/generateMetadataObject';
import { CorrectResultRanking } from './_components/CorrectResultRanking';
import { PageSubNavigation } from './_components/PageSubNavigation';
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
    <Stack>
      <Stack px={1} width='100%' maxWidth='500px' mx='auto' minHeight='calc(100vh - 56px)'>
        <PageSubNavigation question={question} />
        <Stack rowGap={3} pb={3}>
          <RankingPageInformation question={question} />
          <CorrectResultRanking question={question} />
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}
