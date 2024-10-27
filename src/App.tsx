import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import Channel from './components/Channel';
import ButtonAppBar from './components/Navbar';

const firebaseConfig = {
  apiKey: 'AIzaSyDsQLcDZxTAkSx3lJRqcU_-8TO6eX0iRNk',
  authDomain: 'smile-chat-21efa.firebaseapp.com',
  projectId: 'smile-chat-21efa',
  storageBucket: 'smile-chat-21efa.appspot.com',
  messagingSenderId: '1002631253622',
  appId: '1:1002631253622:web:1692f943a1370cb9ae1957',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return <div>Loading...</div>;
  console.log('USER', user);
  return (
    <>
      <ButtonAppBar user={user} auth={auth} />
      {user ? (
        <>
          <div>Welcome to chat!</div>
          <Channel user={user} db={db} />
        </>
      ) : (
        <div>EMPTY</div>
      )}
    </>
  );
};

export default App;
