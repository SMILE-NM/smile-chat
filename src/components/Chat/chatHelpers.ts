import { getUserData, getUserChats } from '../../services/userService';
import { User } from '../../types/types';

export const fetchUserChatsWithDetails = async (userId: string) => {
  try {
    const userChats: any = await getUserChats(userId);
    const userDetails: Record<string, User> = {};

    for (const chat of userChats) {
      const otherUserId = chat.participants.find((id: string) => id !== userId);
      if (otherUserId && !userDetails[otherUserId]) {
        const userData = await getUserData(otherUserId);
        if (userData) {
          userDetails[otherUserId] = userData as User;
        }
      }
    }

    return { userChats, userDetails };
  } catch (error) {
    console.error('Ошибка при загрузке чатов:', error);
    throw error;
  }
};

export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const userData = await getUserData(userId);
    return userData ? (userData as User) : null;
  } catch (error) {
    console.error('Ошибка при загрузке пользователя:', error);
    throw error;
  }
};
