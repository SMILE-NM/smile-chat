import React, { useState } from 'react';
import { User } from 'firebase/auth';

import ContactList from '../components/Contacts/ContactList'; // Импортируем ContactList
import MessagePanel from '../components/Message/MessagePanel';
import { Message } from '../types';

type Props = {
  user: User;
};

const MainPage: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const contacts = [
    {
      id: 1,
      name: 'General group',
      collectionName: 'messages',
      avatarUrl: 'https://example.com/alice.jpg',
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <ContactList />
      <div style={{ flex: 2 }}>
        <MessagePanel user={user} messages={messages} />
      </div>
    </div>
  );
};

export default MainPage;
