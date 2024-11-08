import React from 'react';

import { Avatar, Box, Typography } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { Message, User } from '../../types/types';

type UserMessageProps = {
  themeMode: string;
  message: Message;
  senderUser: User | null;
};

export const UserMessage: React.FC<UserMessageProps> = ({
  themeMode,
  message,
  senderUser,
}) => (
  <>
    <Avatar
      src={senderUser?.photoURL || ''}
      sx={{
        marginRight: 1,
        marginLeft: 0,
        alignSelf: 'end',
      }}
    />
    <Box
      sx={{
        padding: '10px 15px',
        borderRadius: '16px 16px 16px 4px',
        maxWidth: '80%',
        color: '#fff',
        background:
          themeMode === 'light'
            ? 'linear-gradient(135deg, #d1c4e9 0%, #b39ddb 100%)'
            : 'linear-gradient(135deg, #5e4a7d 0%, #4a3663 100%)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }}
    >
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: '0.75rem', mb: 0.5, fontWeight: 500 }}
      >
        {senderUser?.name}
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
