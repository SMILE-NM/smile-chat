// src/services/authService.ts
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from '../api/firebase'; // Импортируйте вашу инициализацию Firestore
import { doc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    console.log('SIGN');
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Сохраните пользователя в Firestore
    console.log('Before Save');
    await addUserToFirestore(user);
    console.log('Saved User');
  } catch (error) {
    console.error('Error during login:', error);
  }
};

const addUserToFirestore = async (user: any) => {
  const userRef = doc(db, 'users', user.uid);
  console.log('USER', {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: new Date(),
  });
  await setDoc(userRef, {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: new Date(),
  });
};
