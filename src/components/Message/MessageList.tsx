import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

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

//Types
import { User as UserFB } from 'firebase/auth';
import { Message, User } from '../../types/types';

//Components
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
  const theme = useTheme();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: 'InfoBackground' }}>
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
          height: '70vh',
          overflowY: 'auto',
          padding: 2,
          margin: '0 auto',
          backgroundColor: 'secondary',
        }}
      >
        <List sx={{ padding: 0 }}>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'row',
                mb: 1.5,
              }}
            >
              {message.senderId === currentUser?.uid ? (
                <CurrentUserMessage
                  themeMode={theme.palette.mode}
                  message={message}
                  currentUser={currentUser}
                />
              ) : (
                <UserMessage
                  themeMode={theme.palette.mode}
                  message={message}
                  senderUser={senderUser}
                />
              )}
            </ListItem>
          ))}
          <div ref={endOfMessagesRef} />
        </List>
      </Box>
    </>
  );
};

export default MessageList;
