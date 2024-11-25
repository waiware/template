'use client';

import { ChatBubble } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { Question } from '@repo/types';
import { type FC, useState, useTransition } from 'react';

import { AnswerButton } from '~/components/models/answer/AnswerButton';
import { CorrectResultInformation } from '~/components/models/correctResult/CorrectResultInformation';
import { useCorrectResultByQuestionId } from '~/hooks/correctResult/useCorrectResultByQuestionId';
import { usePostsByQuestionId } from '~/hooks/post/usePostsByQuestionId/usePostsByQuestionId';
import { trpcClient } from '~/trpc/client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

type Props = {
  question: Question;
};

export const DisplayResultOrAnswerButton: FC<Props> = ({ question }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { data: posts, isLoading: isLoadingPosts } = usePostsByQuestionId({
    questionId: question.id,
  });

  const {
    data: correctResultWithAnswer,
    isLoading: isLoadingCorrectResult,
    mutate,
  } = useCorrectResultByQuestionId({
    questionId: question.id,
  });

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await trpcClient.answer.answer.mutate({
        answerBody: formData.get('answer')?.toString() || '',
        questionId: question.id,
      });
      setOpen(false);
      mutate();

      MySwal.fire({
        title: result.isCorrect ? '正解 🎉' : '不正解 😭',
        text: result.isCorrect ? question.answer : undefined,
        footer: result.isCorrect ? (
          <Stack textAlign='center' alignItems='center' justifyContent='center'>
            <Typography variant='caption' color='textSecondary'>
              この問題はどうでしたか？
            </Typography>
            <Link
              sx={{ textDecoration: 'none', width: 'fit-content', ':hover': { opacity: 0.7 } }}
              href={`/${question.id}/ranking`}
            >
              <Typography variant='caption' textAlign='center'>
                ランキングを見る
              </Typography>
            </Link>
          </Stack>
        ) : undefined,
        confirmButtonText: result.isCorrect ? '閉じる' : 'もう一度挑戦する',
        icon: result.isCorrect ? 'success' : 'error',
      });
    });
  }

  const isLoading = isLoadingPosts || isLoadingCorrectResult;
  if (isLoading) return null;

  const isUserPostLast = (posts || [])[(posts || []).length - 1]?.postType === 'USER';

  return (
    <>
      {correctResultWithAnswer && (
        <CorrectResultInformation correctResultWithAnswer={correctResultWithAnswer} question={question} />
      )}
      {!correctResultWithAnswer && !isUserPostLast && (posts || []).length !== 0 && (
        <AnswerButton handleClick={() => handleClickOpen()} />
      )}
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
