import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/userService';
import {
  Card,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Contact, Message } from '../../types';
import { getMessages } from '../../services/firebaseServices';

type ContactListProps = {
  contacts: Contact[];
  setMessages: (value: Message[]) => void;
};

const ContactsList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log('Users', users);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersList = await fetchUsers();
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <List
      sx={{
        width: '40%',
        backgroundColor: '#f5f5f5', // Задаем сплошной цвет фона для списка
        padding: '0px',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      {users.map((user) => (
        <Card
          // onClick={() =>
          //   handleChangeMessages(contact.collectionName, setMessages)
          // }
          key={user.id}
          sx={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            transition: '0.1s',
          }}
        >
          <ListItem>
            <ListItemAvatar sx={{ marginLeft: '10px' }}>
              <Avatar src={user.photoURL} sx={{ bgcolor: '#1976d2' }}>
                {user.name[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'regular', color: '#333' }}>
                  {user.name}
                </Typography>
              }
            />
          </ListItem>
        </Card>
      ))}
    </List>
  );
};

export default ContactsList;

// <div>
//       <h2>Registered Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <p>Name: {user.name}</p>
//             <p>Email: {user.email}</p>
//           </li>
//         ))}
//       </ul>
//     </div>

// const ContactList: React.FC<ContactListProps> = ({ contacts, setMessages }) => {
//   const handleChangeMessages = (
//     collectionName: string,
//     setMessages: (value: Message[]) => void,
//   ) => {
//     getMessages(collectionName, setMessages);
//   };

//   return (
// };

// export default ContactList;
