import { useState } from 'react';
//Services
import { sendMessage } from '../../services/firebaseServices';
//Firebase
import { User } from 'firebase/auth';
//Types
import { Message } from '../../types';
//Components
import MessageList from './MessageList';
import MessageInput from './MessageInput';

type Props = {
  user: User | null;
  messages: Message[];
};

const MessagePanel: React.FC<Props> = ({ user, messages }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const { uid, displayName, photoURL } = user || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(
        { text: newMessage, uid, displayName, photoURL },
        'messages',
      );
      setNewMessage('');
    }
  };

  return (
    <div>
      <MessageList messages={messages} userName={user?.displayName || ''} />
      <MessageInput
        newMessage={newMessage}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default MessagePanel;
