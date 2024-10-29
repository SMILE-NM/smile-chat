import React from 'react';
import { User } from 'firebase/auth';
import { db } from '../api/firebase';

import ContactList from '../components/Contacts/ContactList'; // Импортируем ContactList
import MessagePanel from '../components/Message/MessagePanel';

type Props = {
  user: User;
};

const MainPage: React.FC<Props> = ({ user }) => {
  // Пример массива контактов
  const contacts = [
    {
      id: 1,
      name: 'General group',
      avatarUrl: 'https://example.com/alice.jpg',
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <ContactList contacts={contacts} /> {/* Используем ContactList */}
      <div style={{ flex: 2 }}>
        <MessagePanel user={user} db={db} />
      </div>
    </div>
  );
};

export default MainPage;
