// MessageInput.tsx
import React from 'react';

type Props = {
  newMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const MessageInput: React.FC<Props> = ({
  newMessage,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newMessage}
        onChange={handleChange}
        placeholder="Введите сообщение"
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default MessageInput;
