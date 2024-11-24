import { CheckCircle } from '@mui/icons-material';
import { Box, Paper, Stack, Typography } from '@mui/material';
import type { CorrectResult } from '@repo/types';

type Props = {
  correctResult: CorrectResult;
  questionAnswer: string;
};

export const CorrectResultInformation: React.FC<Props> = ({ correctResult, questionAnswer }) => {
  return (
    <Paper sx={{ p: 2 }} square elevation={0}>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CheckCircle sx={{ height: 24, width: 24, color: props => props.palette.success.main }} />
        <Typography variant='h6' align='center' sx={{ fontWeight: 'bold', alignItems: 'center' }}>
          回答済み
        </Typography>
      </Box>
      <Stack rowGap={1}>
        <Typography variant='body2'>質問数：{correctResult.numberOfPosts}</Typography>
        <Typography variant='body2'>回答にかかった時間：{correctResult.elapsedSeconds}秒</Typography>
        <Typography variant='body2'>正解：{questionAnswer}</Typography>
      </Stack>
    </Paper>
  );
};
