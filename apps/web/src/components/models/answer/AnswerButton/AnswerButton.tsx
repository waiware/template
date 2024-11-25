import { Lightbulb } from '@mui/icons-material';
import { Button } from '@mui/material';

type Props = {
  handleClick: () => void;
};

export const AnswerButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <Button
      variant='text'
      color='info'
      sx={{ fontWeight: 'bold', width: '60%', mx: 'auto' }}
      startIcon={<Lightbulb />}
      onClick={handleClick}
    >
      答える
    </Button>
  );
};
