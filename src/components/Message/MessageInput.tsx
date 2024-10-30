import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; // Импортируем иконку отправки
import React from 'react';
import { Send, SendRounded, SendSharp } from '@mui/icons-material';

type Props = {
  newMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const MessageInput: React.FC<Props> = ({
  newMessage,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <TextField
        fullWidth
        onChange={handleChange}
        value={newMessage}
        id="fullWidth"
        variant="outlined"
        placeholder="Введите ваше сообщение..."
        sx={{
          margin: '8px',

          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
          },
        }}
      />
      <IconButton type="submit" color="primary">
        <SendRounded />
      </IconButton>
    </form>
  );
};

export default MessageInput;
