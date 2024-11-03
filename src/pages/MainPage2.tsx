// import React, { useState } from 'react';
// import { User } from 'firebase/auth';

// import { getOrCreateChat } from '../services/chatServices';

// import ChatComponent from '../components/Message/ChatComponent';
// import UserList from '../components/Chat/UserList';
// import ChatList from '../components/Chat/ChatList';

// type Props = {
//   user: User | null;
// };

// const MainPage: React.FC<Props> = ({ user }) => {
//   const [selectedChat, setSelectedChat] = useState<string | null>(null);
//   const [receiverId, setReceiverId] = useState<string | null>(null);

//   const handleSelectChat = (chatId: string, otherUserId: string) => {
//     setSelectedChat(chatId);
//     setReceiverId(otherUserId);
//   };

//   const handleSelectUser = async (otherUserId: string) => {
//     if (!user) return;

//     // Получаем или создаем чат с выбранным пользователем
//     const chatId = await getOrCreateChat(user.uid, otherUserId);
//     setSelectedChat(chatId);
//     setReceiverId(otherUserId);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <UserList
//         currentUserId={user?.uid || ''}
//         onSelectUser={handleSelectUser}
//       />
//       <ChatList userId={user?.uid || ''} onSelectChat={handleSelectChat} />

//       <div style={{ flex: 2 }}>
//         {selectedChat && receiverId ? (
//           <ChatComponent
//             userId={user?.uid || ''}
//             chatId={selectedChat}
//             receiverId={receiverId}
//           />
//         ) : (
//           <div style={{ padding: '1rem' }}>
//             Выберите пользователя или чат для начала общения
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const MainPage2 = () => {};

export default MainPage2;
