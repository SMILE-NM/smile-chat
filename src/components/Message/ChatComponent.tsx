// src/components/ChatComponent.tsx
import React, { useState, useEffect } from 'react';
import { sendMessage, subscribeToMessages } from '../../services/chatServices';
import { Message, User } from '../../types/types';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { fetchUserById } from '../Chat/chatHelpers';

interface ChatComponentProps {
  user: User | null;
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
        console.log('Get USer By ID', userData);
        setSenderUser(userData);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    loadUserData();

    const unsubscribe = subscribeToMessages(chatId, (newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      await sendMessage(chatId, user?.id || '', receiverId, messageText);
      setMessageText('');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* <div
        style={{
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '1rem',
        }}
      >
        {messages.map((msg) => (
          <p
            key={msg.id}
            style={{ textAlign: msg.senderId === userId ? 'right' : 'left' }}
          >
            <strong>{msg.senderId === userId ? user?.name : 'Друг'}:</strong>{' '}
            {msg.messageText}
          </p>
        ))}
      </div> */}

      {/* <MessageInput /> */}
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
    </div>
  );
};

export default ChatComponent;
