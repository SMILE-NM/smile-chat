// LoginPage.tsx
import React from 'react';
import { auth } from '../api/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginPage: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h1>Please Log In</h1>
      <button onClick={handleLogin}>Log in with Google</button>
    </div>
  );
};

export default LoginPage;
