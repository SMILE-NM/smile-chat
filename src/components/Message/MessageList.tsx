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
      {/* Угол */}
      <List sx={{ padding: 0 }}>
        {messages.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'row',
              // message.displayName === userName ? 'row-reverse' : 'row',
              mb: 1.5,
            }}
          >
            <Avatar
              // alt={message.displayName}
              src={message.photoURL || ''}
              sx={{
                marginRight: message.displayName === userName ? 0 : 1,
                marginLeft: message.displayName === userName ? 1 : 0,
                alignSelf: 'end',
                mr: 1.5,
              }}
            />
            <Box
              sx={{
                padding: '10px 15px',
                borderRadius: '24px 24px 24px 2px',
                //   : '16px 16px 16px 4px',
                // message.displayName === userName
                //   ? '16px 16px 4px 16px'
                //   : '16px 16px 16px 4px',
                maxWidth: '80%',
                color: message.displayName === userName ? '#333' : '#fff',
                background:
                  message.displayName === userName
                    ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
                    : // : 'linear-gradient(135deg, #ef9a9a 0%, #e57373 100%)',
                      'linear-gradient(135deg, #d1c4e9 0%, #b39ddb 100%)',

                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: '0.75rem', mb: 0.5, fontWeight: 500 }}
              >
                {message.displayName === userName ? 'You' : message.displayName}
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
        <div ref={endOfMessagesRef} />
      </List>
    </Box>
  );
};

export default MessageList;
