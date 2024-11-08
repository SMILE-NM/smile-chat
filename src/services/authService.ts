// src/services/authService.ts
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from '../api/firebase';
import { doc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await addUserToFirestore(user);
    console.log('Saved User');
  } catch (error) {
    console.error('Error during login:', error);
  }
};

const addUserToFirestore = async (user: any) => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: new Date(),
  });
};
