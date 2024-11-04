import { Google } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import React from 'react';
type Props = {
  signInWithGoogle: () => void;
};

const LoginPage: React.FC<Props> = ({ signInWithGoogle }) => {
  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <List
      sx={{
        width: '100%',
        margin: '0 auto',
        height: '100vh',
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
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // полупрозрачный белый
          borderRadius: 8,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // мягкая тень
          backdropFilter: 'blur(10px)', // размытие фона для стеклянного эффекта
          WebkitBackdropFilter: 'blur(10px)', // для Safari
          border: '1px solid rgba(255, 255, 255, 0.3)', // светлая граница для стеклянного вида
        }}
      >
        <Typography variant="h4" component="div">
          Welcome to Smile Chat
        </Typography>

        <IconButton
          color="primary"
          aria-label="add an alarm"
          onClick={handleLogin}
        >
          <Google sx={{ width: '75px', height: '75px' }} />
        </IconButton>

        <Typography variant="h6" component="div">
          Click to Google logo
        </Typography>
      </div>
    </List>
  );
};

export default LoginPage;
