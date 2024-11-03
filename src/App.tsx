// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './api/firebase';
import { User } from 'firebase/auth';
import { signInWithGoogle } from './services/authService';

// Components
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

// import Chats from './components/Chats'; // Ваш компонент для чатов
// import Contacts from './components/Contacts'; // Ваш компонент для контактов
// import DashboardLayoutBasic from './pages/DashboardLayoutBasic'; // Импорт вашего Dashboard

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log('Current USer', currentUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return <div>Loading...</div>;

  return (
    <Router>
      {/* Navbar можно раскомментировать, если нужно */}
      {/* <Navbar user={user} auth={auth} signInWithGoogle={signInWithGoogle} /> */}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MainPage user={user} />
            ) : (
              <LoginPage signInWithGoogle={signInWithGoogle} />
            )
          }
        />
        {/* <Route path="/chats" element={<Chats />} /> */}
        {/* <Route path="/contacts" element={<Contacts />} /> */}
        {/* <Route path="/" element={'NOO'} /> */}
        {/* <Route path="/main" element={<MainPage user={user} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
