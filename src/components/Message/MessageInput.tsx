import { TextField, IconButton } from '@mui/material';
import React from 'react';
import { SendRounded } from '@mui/icons-material';

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
