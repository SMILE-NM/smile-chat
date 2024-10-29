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
        variant="outlined" // Используем контурный стиль
        placeholder="Введите ваше сообщение..." // Плейсхолдер
        sx={{
          margin: '8px', // Отступ между текстовым полем и кнопкой

          '& .MuiOutlinedInput-root': {
            borderRadius: '15px', // Закругляем углы текстового поля
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
