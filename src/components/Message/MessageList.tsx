import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  Toolbar,
  Divider,
  ListItemText,
} from '@mui/material';
import { User as UserFB } from 'firebase/auth';
import { Message, User } from '../../types/types';
import { CurrentUserMessage } from './CurrentUserMessage';
import { UserMessage } from './UserMessage';

type Props = {
  messages: Message[];
  currentUser: UserFB | null;
  senderUser: User | null;
};

const MessageList: React.FC<Props> = ({
  messages,
  currentUser,
  senderUser,
}) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: 'Menu' }}>
        <Toolbar>
          <Avatar src={senderUser?.photoURL || ''} sx={{ mr: 1 }} />
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: 'regular' }} color="textPrimary">
                {senderUser?.name}
              </Typography>
            }
            secondary={
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: 11 }}
              >
                {senderUser?.email}
              </Typography>
            }
          />
        </Toolbar>
      </Box>
      <Divider />
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          height: '75vh',
          overflowY: 'auto',
          padding: 2,
          margin: '0 auto',
          backgroundColor: 'secondary',
        }}
      >
        <List sx={{ padding: 0 }}>
          {messages.map((message) => {
            const chatInfo =
              message.senderId === currentUser?.uid ? 'currentUser' : 'user';

            return (
              <ListItem
                key={message.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  mb: 1.5,
                }}
              >
                {chatInfo === 'currentUser' ? (
                  <CurrentUserMessage
                    message={message}
                    currentUser={currentUser}
                  />
                ) : (
                  <UserMessage message={message} senderUser={senderUser} />
                )}
              </ListItem>
            );
          })}
          <div ref={endOfMessagesRef} />
        </List>
      </Box>
    </>
  );
};

export default MessageList;
