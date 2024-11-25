import { CheckCircle } from '@mui/icons-material';
import { Box, Paper, Stack, Typography } from '@mui/material';
import type { CorrectResult } from '@repo/types';

type Props = {
  correctResult: CorrectResult;
  questionAnswer: string;
};

export const CorrectResultInformation: React.FC<Props> = ({ correctResult, questionAnswer }) => {
  return (
    <Paper sx={{ p: 2, borderRadius: 2 }} square elevation={0}>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CheckCircle sx={{ height: 24, width: 24, color: props => props.palette.success.main }} />
        <Typography variant='h6' align='center' sx={{ fontWeight: 'bold', alignItems: 'center' }}>
          回答済み
        </Typography>
      </Box>
      <Stack rowGap={1}>
        <Stack rowGap={0.5}>
          <Typography variant='body2' sx={{ color: props => props.palette.text.secondary }}>
            質問数
          </Typography>
          <Typography variant='body2'>
            <Typography component='span' sx={{ fontWeight: 'bold' }}>
              {correctResult.numberOfPosts}
            </Typography>{' '}
            回
          </Typography>
        </Stack>
        <Stack rowGap={0.5}>
          <Typography variant='body2' sx={{ color: props => props.palette.text.secondary }}>
            回答にかかった時間
          </Typography>
          <Typography variant='body2'>
            <Typography component='span' sx={{ fontWeight: 'bold' }}>
              {correctResult.elapsedSeconds}
            </Typography>{' '}
            秒
          </Typography>
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
