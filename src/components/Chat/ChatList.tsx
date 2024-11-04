import React, { useEffect, useState } from 'react';
import { fetchUserChatsWithDetails } from './chatHelpers';
import { User, Chat } from '../../types/types';
import {
  Avatar,
  Box,
  Card,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { SkeletonUsers } from './Skeleton/SkeletonUsers';

interface ChatListProps {
  userId: string;
  onSelectChat: (chatId: string, otherUserId: string) => void; // Это определение должно быть здесь
}

const ChatList: React.FC<ChatListProps> = ({ userId, onSelectChat }) => {
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [userDetails, setUserDetails] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const { userChats, userDetails } =
          await fetchUserChatsWithDetails(userId);
        setUserChats(userChats);

        setUserDetails(userDetails);
      } catch (err) {
        setError('Ошибка при загрузке чатов');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [userId]);

  if (loading) return <SkeletonUsers />;
  if (error) return <div>{error}</div>; // Отображение ошибки

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: '90vh', // Высота чата с ограничением
        overflowY: 'auto', // Добавляем вертикальную прокрутку
        padding: 2,
        margin: '0 auto',
        backgroundColor: 'secondary',
      }}
    >
      <Typography variant="h5" mb={2}>
        Chats
      </Typography>
      <List
        sx={{
          padding: '0px',
          maxHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {userChats.map((chat) => {
          const otherUserId = chat.participants.find((id) => id !== userId);
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
    </Box>
  );
};

export default ChatList;
