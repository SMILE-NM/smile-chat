import React from 'react';
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

const ContactList: React.FC<ContactListProps> = ({ contacts, setMessages }) => {
  const handleChangeMessages = (
    collectionName: string,
    setMessages: (value: Message[]) => void,
  ) => {
    getMessages(collectionName, setMessages);
  };

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
      {contacts.map((contact) => (
        <Card
          onClick={() =>
            handleChangeMessages(contact.collectionName, setMessages)
          }
          key={contact.id}
          sx={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            transition: '0.1s',
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar src={contact.avatarUrl} sx={{ bgcolor: '#1976d2' }}>
                {contact.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'regular', color: '#333' }}>
                  {contact.name}
                </Typography>
              }
            />
          </ListItem>
        </Card>
      ))}
    </List>
  );
};

export default ContactList;
