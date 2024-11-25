import { CheckCircle } from '@mui/icons-material';
import { Box, Paper, Stack, Typography } from '@mui/material';
import type { Answer, CorrectResult } from '@repo/types';
import { formatSecondsToDisplayTime } from '~/utils/formatSecondsToDisplayTime';

type Props = {
  correctResultWithAnswer: CorrectResult & {
    answer: Answer;
  };
  questionAnswer: string;
};

export const CorrectResultInformation: React.FC<Props> = ({ correctResultWithAnswer, questionAnswer }) => {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, border: props => `${props.palette.divider} 1px solid` }} square elevation={0}>
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
          <Typography variant='body2'>{formatSecondsToDisplayTime(correctResultWithAnswer.elapsedSeconds)}</Typography>
        </Stack>
        <Stack rowGap={0.5}>
          <Typography variant='body2' sx={{ color: props => props.palette.text.secondary }}>
            真相
          </Typography>
          <Typography variant='body2'>{questionAnswer}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
