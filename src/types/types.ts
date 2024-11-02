// types.ts
export type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: Date;
  edited?: boolean;
  deleted?: boolean;
};

export type Chat = {
  id: string;
  participants: string[]; // ID пользователей в чате
  lastMessage: string; // Текст последнего сообщения для отображения в списке
  participant: {
    id: string;
    name: string;
    photoURL?: string;
  };
  updatedAt: Date; // Дата последнего обновления
};

export type Contact = {
  id: number;
  name: string;
  collectionName: string;
  photoURL?: string;
};
