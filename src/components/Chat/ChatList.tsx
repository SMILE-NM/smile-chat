import React, { useEffect, useState } from 'react';
import { fetchUserChatsWithDetails } from './chatHelpers';
import { User, Chat } from '../../types/types';

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
        const { userChats, userDetails } = await fetchUserChatsWithDetails(
          userId,
        );
        console.log('userChats', userChats);
        setUserChats(userChats);

        // setUserChats(() =>
        //   userChats.filter(
        //     (chat: Chat) => chat.messages && chat.messages.length > 0,
        //   ),
        // );

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
      <h2>Чаты</h2>
      <ul>
        {userChats.map((chat) => {
          console.log('Chat', chat);
          const otherUserId = chat.participants.find((id) => id !== userId);
          console.log('otherUserId', otherUserId);
          const otherUserData = userDetails[otherUserId || ''];
          return (
            <li
              key={chat.id}
              onClick={() => onSelectChat(chat.id, otherUserId || '')}
            >
              {otherUserData
                ? `${otherUserData.name} (${otherUserData.email})`
                : 'Пользователь не найден'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
