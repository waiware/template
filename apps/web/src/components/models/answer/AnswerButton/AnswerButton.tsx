import { ChatBubble, Lightbulb } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState, useTransition } from 'react';

type Props = {
  questionId: string;
};

export const AnswerButton: React.FC<Props> = ({ questionId }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(formData: FormData) {
    const rawFormData = {
      answer: formData.get('answer'),
    };

    console.log(rawFormData);
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
              startIcon={<ChatBubble />}
              // disabled={isUserPostLast || !formState.isValid}
            >
              質問する
            </Button>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
