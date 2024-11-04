import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/userService';
//Components
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

import { User } from '../../types/types';

interface UserListProps {
  currentUserId: string;
  onSelectUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ currentUserId, onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();

        const filteredUsers = usersData.filter(
          (user: User) => user.id !== currentUserId,
        );
        setUsers(filteredUsers);
      } catch (err) {
        setError('Ошибка при загрузке пользователей');
        console.error('Ошибка при загрузке пользователей:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  const handleUserSelect = async (userId: string) => {
    if (isSending) return; // Предотвращает повторные клики
    setIsSending(true);
    await onSelectUser(userId);
    setIsSending(false);
  };

  if (loading) return <SkeletonUsers />;
  if (error) {
    return <div className="error">{error}</div>;
  }

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
        Contacts
      </Typography>
      <List
        sx={{
          padding: '0px',
          maxHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {users.map((user) => (
          <Card
            key={user.id}
            onClick={() => !isSending && handleUserSelect(user.id)}
          >
            <Divider />
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={user.photoURL} sx={{ bgcolor: '#1976d2' }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontWeight: 'regular' }}
                    color="textPrimary"
                  >
                    {user.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: 11 }}
                  >
                    {user.email}
                  </Typography>
                }
              />
            </ListItemButton>
            <Divider />
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
