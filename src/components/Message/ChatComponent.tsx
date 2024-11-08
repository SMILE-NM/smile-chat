import React, { useState, useEffect } from 'react';

import { sendMessage, subscribeToMessages } from '../../services/chatServices';
import { fetchUserById } from '../Chat/chatHelpers';
//Types
import { Message, User } from '../../types/types';
import { User as UserFB } from 'firebase/auth';
//Components
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface ChatComponentProps {
  user: UserFB | null;
  chatId: string;
  receiverId: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  user,
  chatId,
  receiverId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [senderUser, setSenderUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserById(receiverId);
        setSenderUser(userData);
      } catch (err) {
        console.error(err);
      }
    };
    loadUserData();

    const unsubscribe = subscribeToMessages(chatId, (newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      setMessageText('');
      await sendMessage(chatId, user?.uid || '', receiverId, messageText);
    }
  };

  return (
    <>
      <MessageList
        messages={messages}
        currentUser={user}
        senderUser={senderUser}
      />
      <MessageInput
        newMessage={messageText}
        handleChange={(e) => setMessageText(e.target.value)}
        handleSubmit={handleSendMessage}
      />
    </>
  );
};

export default ChatComponent;
