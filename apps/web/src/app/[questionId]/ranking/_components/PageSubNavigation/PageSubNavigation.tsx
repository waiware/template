'use client';

import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import type { Question } from '@repo/types';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { BackLink } from '~/components/uiParts/BackLink';

type Props = {
  question: Question;
};

export const PageSubNavigation: FC<Props> = ({ question }) => {
  return (
    <Box py={1} display='flex' alignItems='center' justifyContent='space-between'>
      <BackLink href={`/${question.id}`} text='問題に戻る' />
      <Box
        sx={{
          height: 20,
          width: 20,
          color: props => props.palette.info.main,
          cursor: 'pointer',
          '&:hover': { opacity: 0.7 },
        }}
        onClick={
          () =>
            navigator
              ?.share({
                title: `${question?.title}のランキング`,
                url: urlJoin(window.location.origin, window.location.pathname),
              })
              .catch(() => void 0) // NOTE: シェアをキャンセルとするとエラーが投げられるため握りつぶす
        }
      >
        <ShareIcon sx={{ height: 20, width: 20, color: props => props.palette.text.secondary }} />
      </Box>
    </Box>
  );
};
