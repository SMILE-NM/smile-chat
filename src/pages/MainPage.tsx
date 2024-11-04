import React, { useState } from 'react';
import { extendTheme } from '@mui/material/styles';

import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import Grid from '@mui/material/Grid2';
import { ChatBubble, ContactsRounded, Logout } from '@mui/icons-material';
import { Avatar, Divider } from '@mui/material';

import { User as UserFB } from 'firebase/auth';
import { auth } from '../api/firebase';
import { getOrCreateChat } from '../services/chatServices';

import ChatComponent from '../components/Message/ChatComponent';
import UserList from '../components/Chat/UserList';
import ChatList from '../components/Chat/ChatList';

import MyLogo from './smile.png';

let NAVIGATION: Navigation = [
  {
    title: 'Profile Name',
  },
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'chats',
    title: 'Chats',
    icon: <ChatBubble />,
  },
  {
    segment: 'contacts',
    title: 'Contacts',
    icon: <ContactsRounded />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'login',
    title: 'Logout',
    icon: <Logout />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

type Props = {
  user: UserFB | null;
  window?: any;
};

const MainPage: React.FC<Props> = ({ user, window }) => {
  NAVIGATION[0] = {
    title: user?.displayName || ' ',
    icon: (
      <Avatar
        src={user?.photoURL || ''}
        sx={{ width: '27px', height: '27px' }}
      />
    ),
  };
  // const { window, user } = props;
  const router = useDemoRouter('/main');
  const demoWindow = window ? window() : undefined;

  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);

  const handleSelectChat = (chatId: string, otherUserId: string) => {
    setSelectedChat(chatId);
    setReceiverId(otherUserId);
  };

  const handleSelectUser = async (otherUserId: string) => {
    if (!user) return;

    // Получаем или создаем чат с выбранным пользователем
    const chatId = await getOrCreateChat(user.uid, otherUserId);
    setSelectedChat(chatId);
    setReceiverId(otherUserId);
  };

  const renderComponent = () => {
    switch (router.pathname) {
      case '/chats':
        return (
          <ChatList userId={user?.uid || ''} onSelectChat={handleSelectChat} />
        );
      case '/contacts':
        return (
          <UserList
            currentUserId={user?.uid || ''}
            onSelectUser={handleSelectUser}
          />
        );
      case '/login':
        auth.signOut();
        return;
      default:
        return (
          <ChatList userId={user?.uid || ''} onSelectChat={handleSelectChat} />
        );
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={MyLogo} alt="MUI logo" />,
        title: 'Smile Chat',
      }}
    >
      <DashboardLayout>
        <Grid container sx={{ height: '100vh' }}>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ padding: '6px' }}>
            {renderComponent()}
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={{ xs: 12, sm: 7.9 }} sx={{ padding: '8px' }}>
            {selectedChat && receiverId ? (
              <ChatComponent
                user={user}
                chatId={selectedChat}
                receiverId={receiverId}
              />
            ) : (
              <div style={{ padding: '1rem' }}></div>
            )}
          </Grid>
        </Grid>
      </DashboardLayout>
    </AppProvider>
  );
};
export default MainPage;
