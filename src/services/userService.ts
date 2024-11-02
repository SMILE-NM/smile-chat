// services/chatServices.ts
import { db } from '../api/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { User } from '../types/types';

// Получаем всех пользователей
export const getUsers = async (): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'users');
    const userDocs = await getDocs(usersRef);
    return userDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Возвращаем все данные из документа
    })) as User[]; // Приводим к типу User
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
    throw new Error('Ошибка при загрузке пользователей');
  }
};

// Получаем чаты пользователя
export const getUserChats = async (userId: string): Promise<any[]> => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Ошибка при загрузке чатов пользователя:', error);
    throw new Error('Ошибка при загрузке чатов пользователя');
  }
};

// Получаем данные конкретного пользователя
export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      return { id: userSnapshot.id, ...userSnapshot.data() } as User; // Приводим к типу User
    } else {
      console.error('Пользователь не найден');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователя:', error);
    throw new Error('Ошибка при загрузке данных пользователя');
  }
};
