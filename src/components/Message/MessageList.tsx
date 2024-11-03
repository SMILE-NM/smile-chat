import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, List, ListItem, Avatar } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { Message, User } from '../../types/types';
import { CurrentUserMessage } from './CurrentUserMessage';
import { UserMessage } from './UserMessage';

// interface Message {
//   id: string;
//   text: string;
//   displayName: string | null;
//   photoURL: string | null;
//   createdAt: Date;
// }

type Props = {
  messages: Message[];
  currentUser: User | null;
  senderUser: User | null;
};

const MessageList: React.FC<Props> = ({
  messages,
  currentUser,
  senderUser,
}) => {
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
        {messages.map((message) => {
          const chatInfo =
            message.senderId === senderUser?.id ? 'senderUser' : 'currentUser';

          return (
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
              {chatInfo === 'currentUser' ? (
                <CurrentUserMessage
                  message={message}
                  currentUser={currentUser}
                />
              ) : (
                <UserMessage message={message} senderUser={senderUser} />
              )}
            </ListItem>
          );
        })}
        <div ref={endOfMessagesRef} />
      </List>
    </Box>
  );
};

export default MessageList;
