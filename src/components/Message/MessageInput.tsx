import { TextField, IconButton, ListItem } from '@mui/material';
import React from 'react';
import { SendRounded } from '@mui/icons-material';

type Props = {
  newMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const MessageInput: React.FC<Props> = ({
  newMessage,
  handleChange,
  handleSubmit,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <ListItem sx={{ display: 'flex' }}>
      <TextField
        fullWidth
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={newMessage}
        id="fullWidth"
        variant="outlined"
        placeholder="Введите ваше сообщение..."
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
        }}
      />
      <IconButton type="button" color="primary" onClick={handleSubmit}>
        <SendRounded />
      </IconButton>
    </ListItem>
  );
};

export default MessageInput;
