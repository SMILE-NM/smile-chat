// App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './api/firebase';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import Navbar from './components/Navbar';
import { User } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar user={user} auth={auth} />
      <Routes>
        <Route
          path="/"
          element={user ? <MainPage user={user} /> : <LoginPage />}
        />
        {/* Можно добавить дополнительные маршруты по мере необходимости */}
      </Routes>
    </Router>
  );
};

export default App;
