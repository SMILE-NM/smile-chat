import React, { useEffect, useState } from 'react';
import { fetchUserChatsWithDetails } from './chatHelpers';
import { User, Chat } from '../../types/types';
import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

interface ChatListProps {
  userId: string;
  onSelectChat: (chatId: string, otherUserId: string) => void; // Это определение должно быть здесь
}

const ChatList: React.FC<ChatListProps> = ({ userId, onSelectChat }) => {
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [userDetails, setUserDetails] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
  const [error, setError] = useState<string | null>(null); // Для обработки ошибок

  useEffect(() => {
    const loadChats = async () => {
      try {
        const { userChats, userDetails } =
          await fetchUserChatsWithDetails(userId);
        // console.log('userChats', userChats);
        setUserChats(userChats);

        // setUserChats(() =>
        //   userChats.filter(
        //     (chat: Chat) => chat.messages && chat.messages.length > 0,
        //   ),
        // );
        // console.log('USER DETAILS', userDetails);
        setUserDetails(userDetails);
      } catch (err) {
        setError('Ошибка при загрузке чатов'); // Обработка ошибки
        console.error(err);
      } finally {
        setLoading(false); // Завершение состояния загрузки
      }
    };

    loadChats();
  }, [userId]);

  if (loading) return <div>Загрузка...</div>; // Состояние загрузки
  if (error) return <div>{error}</div>; // Отображение ошибки

  return (
    <div>
      <Typography variant="h5" mb={2}>
        Chats
      </Typography>
      <List
        sx={{
          // width: '40%',

          padding: '0px',
          maxHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {userChats.map((chat) => {
          console.log('Chat', chat);
          const otherUserId = chat.participants.find((id) => id !== userId);
          console.log('otherUserId', otherUserId);
          const otherUserData = userDetails[otherUserId || ''];
          return (
            <Card
              key={chat.id}
              onClick={() => onSelectChat(chat.id, otherUserId || '')}
            >
              <Divider />
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    src={otherUserData.photoURL}
                    sx={{ bgcolor: '#1976d2' }}
                  >
                    {otherUserData.name[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontWeight: 'regular' }}
                      color="textPrimary"
                    >
                      {otherUserData.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: 11 }}
                    >
                      {otherUserData.email}
                    </Typography>
                  }
                />
              </ListItemButton>
              <Divider />
            </Card>
          );
        })}
      </List>
    </div>
  );
};

export default ChatList;
