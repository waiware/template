import type { Metadata } from 'next';

const DEFAULT_TITLE = 'サイコパスマスター';
const DEFAULT_DESCRIPTION = 'サイコパス診断 × ウミガメのスープ';
const DEFAULT_URL = 'https://template-master.wai-ware.com/';

type Args = {
  title?: string;
  description?: string;
  url?: string;
  images?: string[];
};

export const generateMetadataObject = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = DEFAULT_URL,
  images,
}: Args = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'サイコパスマスター',
      locale: 'ja_JP',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      site: '@',
      creator: '@',
    },
    metadataBase: new URL(DEFAULT_URL),
  };
};
