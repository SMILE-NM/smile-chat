import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { db } from '../api/firebase';

import ContactList from '../components/Contacts/ContactList'; // Импортируем ContactList
import MessagePanel from '../components/Message/MessagePanel';
import { Message } from '../types';
import { getMessages } from '../services/firebaseServices';

type Props = {
  user: User;
};

const MainPage: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const contacts = [
    {
      id: 1,
      name: 'General group',
      avatarUrl: 'https://example.com/alice.jpg',
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      {/* <ContactList contacts={contacts} setMessages={setMessages} /> */}
      <div style={{ flex: 2 }}>
        <MessagePanel user={user} db={db} messages={messages} />
      </div>
    </div>
  );
};

export default MainPage;
