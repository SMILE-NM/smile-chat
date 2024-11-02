import React, { useEffect, useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Chat, Message } from '../../types/types';
import { getUserChats } from '../../services/chatService'; // Функция для получения чатов
import { getMessages } from '../../services/firebaseServices'; // Функция для загрузки сообщений по ID чата

type ContactsListProps = {
  setMessages: (messages: Message[]) => void; // Функция для установки сообщений в правой панели
  currentUserId: string; // ID текущего пользователя
};

const ContactsList: React.FC<ContactsListProps> = ({
  setMessages,
  currentUserId,
}) => {
  const [chats, setChats] = useState<Chat[]>([]); // Массив чатов
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const chatsList = await getUserChats(currentUserId); // Загружаем только чаты пользователя
        setChats(chatsList);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [currentUserId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Обработчик для клика по чату
  const handleChatClick = async (chatId: string) => {
    const messages = await getMessages(chatId); // Загружаем сообщения для выбранного чата
    setMessages(messages); // Устанавливаем сообщения в компоненте чата
  };

  return (
    <List
      sx={{
        width: '40%',
        backgroundColor: '#f5f5f5',
        padding: '0px',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      {chats.map((chat) => (
        <Card
          key={chat.id}
          onClick={() => handleChatClick(chat.id)} // Обрабатываем клик для отображения сообщений
          sx={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: '#f5f5f5' },
            transition: '0.1s',
          }}
        >
          <ListItem>
            <ListItemAvatar sx={{ marginLeft: '10px' }}>
              <Avatar
                src={chat.participant.photoURL}
                sx={{ bgcolor: '#1976d2' }}
              >
                {chat.participant.name[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'regular', color: '#333' }}>
                  {chat.participant.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {chat.lastMessage} {/* Отображаем последнее сообщение */}
                </Typography>
              }
            />
          </ListItem>
        </Card>
      ))}
    </List>
  );
};

export default ContactsList;
