// types.ts

export interface Message {
  id?: string; // ID сообщения (может отсутствовать при отправке нового сообщения)
  senderId: string; // ID отправителя сообщения
  receiverId: string; // ID получателя сообщения
  messageText: string; // Текст сообщения
  edited: boolean; // Флаг, показывающий, редактировалось ли сообщение
  deleted: boolean; // Флаг, показывающий, было ли сообщение удалено
  createdAt: Date | null; // Дата и время создания сообщения
  updatedAt: Date | null; // Дата и время последнего обновления сообщения
}

export type Chat = {
  id: string;
  messages: {};
  participants: string[]; // ID пользователей в чате
};

export type Contact = {
  id: number;
  name: string;
  collectionName: string;
  photoURL?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
};
