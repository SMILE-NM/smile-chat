import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './api/firebase';
import { User as UserFB } from 'firebase/auth';
import { signInWithGoogle } from './services/authService';

// Components
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  const [user, setUser] = useState<UserFB | null>(auth.currentUser);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log('Current User', currentUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return <div>Loading...</div>;

  return (
    <Router>
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
      </Routes>
    </Router>
  );
};

export default App;
