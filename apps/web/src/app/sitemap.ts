import type { MetadataRoute } from 'next';
import { listQuestions } from '~/actions/question';

const baseUrl = 'https://psychopath-master-api.wai-ware.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const questions = await listQuestions();

  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
    },
  ];

  const questionPaths: MetadataRoute.Sitemap = questions.map(question => ({
    url: `${baseUrl}/${question.id}`,
    lastModified: new Date(question.createdAt),
    changeFrequency: 'never',
  }));

  return [...staticPaths, ...questionPaths];
}
