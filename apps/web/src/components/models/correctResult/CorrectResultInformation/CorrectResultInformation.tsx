import { CheckCircle } from '@mui/icons-material';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import type { Answer, CorrectResult, Question } from '@repo/types';
import urlJoin from 'url-join';
import { formatSecondsToDisplayTime } from '~/utils/formatSecondsToDisplayTime';

type Props = {
  correctResultWithAnswer: CorrectResult & {
    answer: Answer;
  };
  question: Question;
};

export const CorrectResultInformation: React.FC<Props> = ({ correctResultWithAnswer, question }) => {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, border: props => `${props.palette.divider} 1px solid` }} square elevation={0}>
      <Stack rowGap={3}>
        <Stack rowGap={2}>
          <Stack rowGap={1}>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <CheckCircle sx={{ height: 24, width: 24, color: props => props.palette.success.main }} />
              <Typography variant='h6' align='center' sx={{ fontWeight: 'bold', alignItems: 'center' }}>
                回答済み
              </Typography>
            </Box>
            <Stack rowGap={1}>
              <Stack rowGap={0.5}>
                <Typography variant='body2' sx={{ color: props => props.palette.text.secondary }}>
                  回答
                </Typography>
                <Typography variant='body2'>{correctResultWithAnswer.answer.body}</Typography>
              </Stack>
              <Stack rowGap={0.5}>
                <Typography variant='body2' sx={{ color: props => props.palette.text.secondary }}>
                  合計質問数
                </Typography>
                <Typography variant='body2'>
                  <Typography component='span'>{correctResultWithAnswer.numberOfPosts}</Typography> 回
                </Typography>
              </Stack>
              <Stack rowGap={0.5}>
                <Typography variant='body2' sx={{ color: props => props.palette.text.secondary }}>
                  回答にかかった時間
                </Typography>
                <Typography variant='body2'>
                  {formatSecondsToDisplayTime(correctResultWithAnswer.elapsedSeconds)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              color: props => props.palette.info.main,
              cursor: 'pointer',
              '&:hover': { opacity: 0.7 },
            }}
            onClick={
              () =>
                navigator
                  ?.share({
                    title: '質問に正解しました！',
                    text: `${question.title}に${correctResultWithAnswer.numberOfPosts}回の質問で${formatSecondsToDisplayTime(correctResultWithAnswer.elapsedSeconds)}で正解しました！`,
                    url: urlJoin(window.location.origin, question.id),
                  })
                  .catch(() => void 0) // NOTE: シェアをキャンセルとするとエラーが投げられるため握りつぶす
            }
          >
            <Typography variant='body2'>\ 結果をSNSにシェア /</Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack rowGap={1}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Typography variant='h6' align='center' sx={{ fontWeight: 'bold', alignItems: 'center' }}>
              真相
            </Typography>
          </Box>
          <Typography variant='body2'>{question.answer}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
