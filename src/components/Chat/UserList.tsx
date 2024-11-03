// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';

import { User } from '../../types/types';
import { getUsers } from '../../services/userService';
import {
  Avatar,
  Card,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

interface UserListProps {
  currentUserId: string;
  onSelectUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ currentUserId, onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

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

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
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
    </div>
  );
};

export default UserList;
