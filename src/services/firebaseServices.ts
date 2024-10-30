import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Firestore,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Message } from '../types/messageTypes';

export const getMessages = (
  db: Firestore,
  callback: (messages: Message[]) => void,
  messageCollectionName: string,
) => {
  const messagesRef = collection(db, messageCollectionName);
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(100));

  return onSnapshot(messagesQuery, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text || '',
      createdAt: doc.data().createdAt
        ? doc.data().createdAt.toDate()
        : new Date(),
      uid: doc.data().uid,
      displayName: doc.data().displayName || null,
      photoURL: doc.data().photoURL || null,
    })) as Message[];
    callback(data);
  });
};

export const sendMessage = async (db: Firestore, message: Partial<Message>) => {
  await addDoc(collection(db, 'messages'), {
    ...message,
    createdAt: serverTimestamp(),
  });
};
