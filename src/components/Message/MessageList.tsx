import React, { useEffect, useRef } from 'react';
import { Box, Typography, List, ListItem, Avatar } from '@mui/material';
import { formatDate } from '../../utils/formatDate';

interface Message {
  id: string;
  text: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
}

type Props = {
  messages: Message[];
  userName: string;
};

const MessageList: React.FC<Props> = ({ messages, userName }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null); // Создаем ссылку на конец списка сообщений

  // useEffect для автоматической прокрутки к последнему сообщению
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' }); // Прокручиваем к последнему сообщению
    }
  }, [messages]); // Вызываем эффект при изменении списка сообщений

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: '500px', // Высота чата с ограничением
        overflowY: 'auto', // Добавляем вертикальную прокрутку
        padding: 2,
        margin: '0 auto',
        backgroundColor: '#fff',
      }}
    >
      <List sx={{ padding: 0 }}>
        {messages.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              // alignItems:
              //   message.displayName === '' ? 'flex-end' : 'flex-start',
              mb: 1.5,
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={message.photoURL || ''}
              sx={{
                marginRight: 1, // Отступ справа от аватара
                alignSelf: 'center', // Центрируем по высоте
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
                borderRadius: '16px',
                maxWidth: '80%',
                color: '#fff',
                backgroundColor:
                  message.displayName === userName ? '#dbecfb' : '',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: '0.75rem', mb: 0.5, fontWeight: 500 }}
              >
                {message.displayName}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                sx={{ wordBreak: 'break-word' }}
              >
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{
                  fontSize: '0.75rem',
                  mt: 0.5,
                  fontWeight: 500,
                  alignSelf: 'flex-end',
                }}
              >
                {formatDate(message.createdAt)}
              </Typography>
            </Box>
          </ListItem>
        ))}
        <div ref={endOfMessagesRef} /> {/* Элемент для прокрутки */}
      </List>
    </Box>
  );
};

export default MessageList;
