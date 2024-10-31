// App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Firebase
import { auth } from './api/firebase';
import { User } from 'firebase/auth';
import { signInWithGoogle } from './services/authService'; // Импортируйте функцию аутентификации

//Components
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

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
      <Navbar user={user} auth={auth} signInWithGoogle={signInWithGoogle} />
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
