import React from 'react';
type Props = {
  signInWithGoogle: () => void;
};

const LoginPage: React.FC<Props> = ({ signInWithGoogle }) => {
  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div>
      <h1>Please Log In</h1>
      <button onClick={handleLogin}>Log in with Google</button>
    </div>
  );
};

export default LoginPage;
