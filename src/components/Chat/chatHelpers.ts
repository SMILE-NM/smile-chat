import { getUserData, getUserChats } from '../../services/userService';
import { User, Chat } from '../../types/types';

export const fetchUserChatsWithDetails = async (userId: string) => {
  try {
    // Получаем список чатов для пользователя
    const userChats: any = await getUserChats(userId);
    const userDetails: Record<string, User> = {};

    // Загружаем данные о собеседниках
    for (const chat of userChats) {
      const otherUserId = chat.participants.find((id: string) => id !== userId);
      if (otherUserId && !userDetails[otherUserId]) {
        const userData = await getUserData(otherUserId);
        if (userData) {
          userDetails[otherUserId] = userData as User; // Указываем, что это User
        }
      }
    }

    return { userChats, userDetails };
  } catch (error) {
    console.error('Ошибка при загрузке чатов:', error);
    throw error; // Перебрасываем ошибку, чтобы обработать ее в вызывающем коде
  }
};
