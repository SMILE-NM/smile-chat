// src/components/ChatComponent.tsx
import React, { useState, useEffect } from 'react';
import { sendMessage, subscribeToMessages } from '../../services/chatServices';
import { Message } from '../../types/types';

interface ChatComponentProps {
  userId: string;
  chatId: string;
  receiverId: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  userId,
  chatId,
  receiverId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToMessages(chatId, (newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      await sendMessage(chatId, userId, receiverId, messageText);
      setMessageText('');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div
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
            <strong>{msg.senderId === userId ? 'Вы' : 'Друг'}:</strong>{' '}
            {msg.messageText}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Введите сообщение"
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={handleSendMessage}>Отправить</button>
    </div>
  );
};

export default ChatComponent;
