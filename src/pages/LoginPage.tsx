import React from 'react';
import { Google } from '@mui/icons-material';
import { IconButton, List, Typography } from '@mui/material';

type Props = {
  signInWithGoogle: () => void;
};

const LoginPage: React.FC<Props> = ({ signInWithGoogle }) => {
  return (
    <List
      sx={{
        width: '100%',
        margin: '0 auto',
        height: '100vh',
        backgroundImage: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 360,
          padding: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 8,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Typography variant="h4" component="div" color="textSecondary">
          Welcome to Smile Chat
        </Typography>

        <IconButton
          color="warning"
          aria-label="add an alarm"
          onClick={signInWithGoogle}
        >
          <Google sx={{ width: '75px', height: '75px' }} />
        </IconButton>

        <Typography variant="h6" component="div" color="textSecondary">
          Click to Google logo
        </Typography>
      </div>
    </List>
  );
};

export default LoginPage;
