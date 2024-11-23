import { ChatBubble, Lightbulb } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { Question } from '@repo/types';
import { useState, useTransition } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { trpcClient } from '~/trpc/client';

const MySwal = withReactContent(Swal);

type Props = {
  question: Question;
};

export const AnswerButton: React.FC<Props> = ({ question }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await trpcClient.answer.answer.mutate({
        answerBody: formData.get('answer')?.toString() || '',
        questionId: question.id,
      });
      setOpen(false);

      MySwal.fire({
        title: result.isCorrect ? '正解 🎉' : '不正解 😭',
        text: result.isCorrect ? question.answer : undefined,
        footer: result.isCorrect ? (
          <Stack>
            <Typography variant='caption' color='textSecondary'>
              この問題はどうでしたか？
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              ランキングを見る
            </Typography>
          </Stack>
        ) : undefined,
        confirmButtonText: result.isCorrect ? '閉じる' : 'もう一度挑戦する',
        icon: result.isCorrect ? 'success' : 'error',
      });
    });
  }

  return (
    <>
      <Button
        variant='text'
        color='info'
        sx={{ fontWeight: 'bold', width: '60%', mx: 'auto' }}
        startIcon={<Lightbulb />}
        onClick={handleClickOpen}
      >
        答える
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle sx={{ px: 2, pb: 1 }}>回答する</DialogTitle>
        <form action={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, p: 2 }}>
            <TextField
              autoFocus
              required
              id='answer'
              name='answer'
              multiline
              placeholder='回答を入力する...'
              rows={2}
              variant='outlined'
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ fontWeight: 'bold' }}
              startIcon={isPending ? <CircularProgress size='16px' /> : <ChatBubble />}
              disabled={isPending}
            >
              {isPending ? '判定中...' : '質問する'}
            </Button>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
