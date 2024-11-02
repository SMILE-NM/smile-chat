// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';

import { User } from '../../types/types';
import { getUsers } from '../../services/userService';

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
      <h4>Список пользователей</h4>
      <ul>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isSending={isSending}
            handleSelectUser={handleUserSelect}
          />
        ))}
      </ul>
    </div>
  );
};

interface UserItemProps {
  user: User;
  isSending: boolean;
  handleSelectUser: (userId: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  isSending,
  handleSelectUser,
}) => (
  <li onClick={() => !isSending && handleSelectUser(user.id)}>
    {user.name} ({user.email})
  </li>
);

export default UserList;
