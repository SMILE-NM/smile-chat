import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';

interface Message {
  id: string;
  text: string;
  displayName: string | null;
}

type Props = {
  messages: Message[];
};

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        height: '500px', // Высота чата с ограничением
        overflowY: 'auto', // Добавляем вертикальную прокрутку
        padding: 2,
        margin: '0 auto',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#f5f5f5',
      }}
    >
      <List sx={{ padding: 0 }}>
        {messages.map((message, index) => (
          <ListItem
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems:
                message.displayName === 'You' ? 'flex-end' : 'flex-start',
              mb: 1.5,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.75rem', mb: 0.5, fontWeight: 500 }}
            >
              {message.displayName}
            </Typography>
            <Box
              sx={{
                padding: '10px 15px',
                borderRadius: '16px',
                maxWidth: '80%',
                color: '#fff',
                backgroundColor:
                  message.displayName === 'You' ? '#0d6efd' : '#6c757d',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                {message.text}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
