import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { db } from '../api/firebase';
import ChatRoom from '../components/ChatRoom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';

type Props = {
  user: User;
};

const contacts = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  // Можно добавить больше контактов для примера
];

const MainPage: React.FC<Props> = ({ user }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const handleSelectChat = (contactId: string) => {
    setSelectedChat(contactId);
  };

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* Левая панель для списка контактов */}
      <Grid
        item
        xs={4}
        sx={{
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Контакты
          </Typography>
          <List>
            {contacts.map((contact) => (
              <div key={contact.id}>
                <ListItem
                  // button
                  // onClick={() => handleSelectChat(contact.id.toString())}
                  // selected={selectedChat === contact.id.toString()}
                  sx={{
                    transition: 'background-color 0.3s ease',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemText
                    primary={contact.name}
                    onClick={() => handleSelectChat(contact.id.toString())}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Правая панель для чата */}
      <Grid item xs={8}>
        <Box
          sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff', // фон чата
          }}
        >
          <Typography variant="h5" gutterBottom>
            Welcome to the Chat
          </Typography>
          {selectedChat ? (
            <ChatRoom
              user={user}
              db={db}
              // chatId={selectedChat}
            />
          ) : (
            <Typography variant="body1" color="text.secondary">
              Выберите контакт, чтобы начать чат.
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainPage;
