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
  addDoc, // Импортируем addDoc для добавления документа
  serverTimestamp, // Импортируем serverTimestamp для установки времени
} from 'firebase/firestore'; // Изменен импорт для Firestore
import { User } from 'firebase/auth';

type Props = {
  user: User | null;
  db: Firestore;
};

interface Message {
  id: string;
  text: string;
  createdAt: Date;
  uid: string; // Добавлено для хранения uid пользователя
  displayName: string | null; // Добавлено для хранения имени пользователя
  photoURL: string | null; // Добавлено для хранения URL фото пользователя
}

const Channel: React.FC<Props> = ({ user, db }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>(''); // Исправлено имя переменной
  const { uid, displayName, photoURL } = user || {}; // Для получения информации о текущем пользователе

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
    setNewMessage(e.target.value); // Исправлено имя переменной
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    if (db) {
      // Используем addDoc для добавления нового сообщения в Firestore
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(), // Используем serverTimestamp для установки времени
        uid,
        displayName,
        photoURL,
      });

      setNewMessage(''); // Очищаем поле ввода после отправки
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <span>{message.displayName} said: </span>
            {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage} // Исправлено имя переменной
          onChange={handleChange}
          placeholder="Введите сообщение"
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Channel;
