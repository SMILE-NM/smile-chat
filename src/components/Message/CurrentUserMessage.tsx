import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { Message, User } from '../../types/types';

type CurrentUserMessageProps = {
  message: Message;
  currentUser: User | null;
};

export const CurrentUserMessage: React.FC<CurrentUserMessageProps> = ({
  message,
  currentUser,
}) => (
  <>
    <Avatar
      src={currentUser?.photoURL || ''}
      sx={{
        marginRight: 0,
        marginLeft: 1,
        alignSelf: 'end',
      }}
    />
    <Box
      sx={{
        padding: '10px 15px',
        borderRadius: '16px 16px 4px 16px',
        maxWidth: '80%',
        color: '#333',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }}
    >
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: '0.75rem', mb: 0.5, fontWeight: 500 }}
      >
        You
      </Typography>
      <Typography
        variant="body1"
        color="textPrimary"
        sx={{ wordBreak: 'break-word' }}
      >
        {message.messageText}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{
          fontSize: '0.75rem',
          mt: 0.5,
          fontWeight: 500,
          alignSelf: 'flex-end',
        }}
      >
        {formatDate(message.createdAt)}
      </Typography>
    </Box>
  </>
);
