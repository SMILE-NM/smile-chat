// src/services/userService.ts
import { db } from '../api/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const fetchUsers = async () => {
  const usersRef = collection(db, 'users');
  const usersSnapshot = await getDocs(usersRef);
  const usersList = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return usersList;
};
