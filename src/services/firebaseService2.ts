import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../api/firebase';

// Функция для получения пользователей
export const getUsers = async () => {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Функция для создания нового чата
export const createChat = async (participants: string[]) => {
  const chatsCol = collection(db, 'chats');
  const chatData = {
    participants,
    lastMessage: null,
    createdAt: new Date(),
  };
  const chatDoc = await addDoc(chatsCol, chatData);
  return chatDoc.id;
};

// Функция для получения чатов для конкретного пользователя
export const getChatsForUser = async (userId: string) => {
  const chatsCol = collection(db, 'chats');
  const q = query(chatsCol, where('participants', 'array-contains', userId));
  const chatSnapshot = await getDocs(q);
  return chatSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Функция для отправки сообщения
export const sendMessage = async (
  chatId: string,
  message: { senderId: string; content: string },
) => {
  const messagesCol = collection(db, `chats/${chatId}/messages`);
  const messageData = {
    ...message,
    timestamp: new Date(),
    edited: false,
    deleted: false,
  };
  await addDoc(messagesCol, messageData);
};

// Функция для редактирования сообщения
export const editMessage = async (
  chatId: string,
  messageId: string,
  updatedContent: string,
) => {
  const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
  await updateDoc(messageRef, {
    content: updatedContent,
    edited: true,
  });
};

// Функция для удаления сообщения
export const deleteMessage = async (chatId: string, messageId: string) => {
  const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
  await deleteDoc(messageRef);
};
