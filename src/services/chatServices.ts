// src/services/chatService.ts
import { db } from '../api/firebase';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  edited: boolean;
  deleted: boolean;
  createdAt: any;
  updatedAt: any;
}

// Создание или получение чата
export const getOrCreateChat = async (
  userId1: string,
  userId2: string,
): Promise<string> => {
  const chatId =
    userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
  const chatRef = doc(db, 'chats', chatId);
  const chatDoc = await getDoc(chatRef);

  if (!chatDoc.exists()) {
    await setDoc(chatRef, {
      participants: [userId1, userId2],
      createdAt: new Date(),
    });
  }

  return chatId;
};

// Отправка сообщения
export const sendMessage = async (
  chatId: string,
  senderId: string,
  receiverId: string,
  messageText: string,
): Promise<void> => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  await addDoc(messagesRef, {
    senderId,
    receiverId,
    messageText,
    edited: false,
    deleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Редактирование сообщения
export const editMessage = async (
  chatId: string,
  messageId: string,
  newText: string,
): Promise<void> => {
  const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
  await updateDoc(messageRef, {
    messageText: newText,
    edited: true,
    updatedAt: serverTimestamp(),
  });
};

// Удаление сообщения (мягкое удаление)
export const deleteMessage = async (
  chatId: string,
  messageId: string,
): Promise<void> => {
  const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
  await updateDoc(messageRef, {
    deleted: true,
    messageText: '', // Очищаем текст для "мягкого" удаления
    updatedAt: serverTimestamp(),
  });
};

// Подписка на сообщения
export const subscribeToMessages = (
  chatId: string,
  onMessageReceived: (messages: Message[]) => void,
) => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));

  return onSnapshot(q, (querySnapshot) => {
    const messages: Message[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      senderId: doc.data().senderId,
      receiverId: doc.data().receiverId,
      messageText: doc.data().deleted ? '[Deleted]' : doc.data().messageText,
      edited: doc.data().edited,
      deleted: doc.data().deleted,
      createdAt: doc.data().createdAt,
      updatedAt: doc.data().updatedAt,
    }));
    onMessageReceived(messages);
  });
};
