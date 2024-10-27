import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Firestore,
  DocumentData,
  QuerySnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import MessageList from './Message/MessageList'; // Импортируем компонент списка сообщений
import MessageInput from './Message/MessageInput'; // Импортируем компонент ввода сообщения

type Props = {
  user: User | null;
  db: Firestore;
};

interface Message {
  id: string;
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

const ChatRoom: React.FC<Props> = ({ user, db }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const { uid, displayName, photoURL } = user || {};

  useEffect(() => {
    if (!db) return;

    const messagesRef = collection(db, 'messages');
    const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(100));

    const unsubscribe = onSnapshot(
      messagesQuery,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
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

        setMessages(data);
      },
    );

    return unsubscribe;
  }, [db]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (db) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });

      setNewMessage('');
    }
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput
        newMessage={newMessage}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatRoom;
