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
import { Message } from '../types/types';

const checkChatExists = async (userId: string, otherUserId: string) => {
  const chatsRef = collection(db, 'chats');
  const q = query(chatsRef, where('participants', 'array-contains', userId));

  const querySnapshot = await getDocs(q);
  for (const doc of querySnapshot.docs) {
    const chatData = doc.data();
    if (chatData.participants.includes(otherUserId)) {
      return doc.id;
    }
  }

  return null;
};

export const getOrCreateChat = async (userId: string, otherUserId: string) => {
  try {
    const existingChatId = await checkChatExists(userId, otherUserId);

    if (existingChatId) {
      return existingChatId;
    }
    const newChatRef = await addDoc(collection(db, 'chats'), {
      participants: [userId, otherUserId],
    });

    return newChatRef.id;
  } catch (error) {
    console.error('Ошибка при получении или создании чата:', error);
    throw new Error('Не удалось получить или создать чат');
  }
};

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
