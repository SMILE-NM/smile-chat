import React, { useState } from 'react';
import { extendTheme, styled } from '@mui/material/styles';

import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import {
  BallotSharp,
  ChatBubble,
  ContactsRounded,
  Logout,
  MarkEmailReadTwoTone,
} from '@mui/icons-material';
import { Avatar, Divider } from '@mui/material';

import { User } from 'firebase/auth';

import { getOrCreateChat } from '../services/chatServices';

import ChatComponent from '../components/Message/ChatComponent';
import UserList from '../components/Chat/UserList';
import ChatList from '../components/Chat/ChatList';

const NAVIGATION: Navigation = [
  {
    segment: '1',
    title: 'Profile Name',
    icon: <Avatar src="" sx={{ width: '25px', height: '25px' }} />,
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

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

type Props = {
  user: User | null;
  window?: Window;
};

const MainPage: React.FC<Props> = (props: any) => {
  const { window, user } = props;
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

  // Функция для определения компонента в зависимости от маршрута
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
      default:
        return <div>Select a section</div>; // По умолчанию
    }
  };
  console.log('USER NAME', user?.name);
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
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
              <div style={{ padding: '1rem' }}>
                Выберите пользователя или чат для начала общения
              </div>
            )}
          </Grid>
        </Grid>
      </DashboardLayout>
    </AppProvider>
  );
};
export default MainPage;
