import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Message } from '../types/messageTypes';
import { db } from '../api/firebase';

export const getMessages = (
  messageCollectionName: string,
  callback: (messages: Message[]) => void,
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
    console.log('DATA', data);
    callback(data);
  });
};

export const sendMessage = async (
  message: Partial<Message>,
  collectionName: string,
) => {
  await addDoc(collection(db, collectionName), {
    ...message,
    createdAt: serverTimestamp(),
  });
};
