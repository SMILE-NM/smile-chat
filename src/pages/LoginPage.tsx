import React from 'react';
type Props = {
  signInWithGoogle: () => void;
};

const LoginPage: React.FC<Props> = ({ signInWithGoogle }) => {
  const handleLogin = async () => {
    console.log('Working 1');
    await signInWithGoogle();
    console.log('Working 2');
  };

  return (
    <div>
      <h1>Please Log In</h1>
      <button onClick={handleLogin}>Log in with Google</button>
    </div>
  );
};

export default LoginPage;
