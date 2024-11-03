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
  return (
    <ListItem sx={{ display: 'flex' }}>
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
      <IconButton type="button" color="primary" onClick={handleSubmit}>
        <SendRounded />
      </IconButton>
    </ListItem>
  );
};

export default MessageInput;
