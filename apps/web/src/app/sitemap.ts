import type { MetadataRoute } from 'next';

const baseUrl = 'https://template-master-api.wai-ware.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
    },
  ];

  return [...staticPaths];
}
