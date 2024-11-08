import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { Message } from '../../types/types';
import { User as UserFB } from 'firebase/auth';
type CurrentUserMessageProps = {
  themeMode: string;
  message: Message;
  currentUser: UserFB | null;
};

export const CurrentUserMessage: React.FC<CurrentUserMessageProps> = ({
  themeMode,
  message,
  currentUser,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      mb: 1,
    }}
  >
    <Box
      sx={{
        padding: '10px 15px',
        borderRadius: '16px 16px 4px 16px',
        maxWidth: '80%',
        color: '#333',
        background:
          themeMode === 'light'
            ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
            : 'linear-gradient(135deg, #4a647d 0%, #38506a 100%)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        marginLeft: 'auto',
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
    <Avatar
      src={currentUser?.photoURL || ''}
      sx={{
        marginRight: 0,
        marginLeft: 1,
        alignSelf: 'end',
      }}
    />
  </Box>
);
