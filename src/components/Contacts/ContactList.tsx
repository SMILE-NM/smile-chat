import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Message } from '../../types';

type Contact = {
  id: number;
  name: string;
  avatarUrl?: string;
};

type ContactListProps = {
  contacts: Contact[];
  // db: db;
  // setMessages: (value: Message[]) => void;
};

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  // const handleChangeMessages()

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
          // onClick={''}
          key={contact.id}
          sx={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Современная тень
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
