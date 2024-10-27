// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDsQLcDZxTAkSx3lJRqcU_-8TO6eX0iRNk',
  authDomain: 'smile-chat-21efa.firebaseapp.com',
  projectId: 'smile-chat-21efa',
  storageBucket: 'smile-chat-21efa.appspot.com',
  messagingSenderId: '1002631253622',
  appId: '1:1002631253622:web:1692f943a1370cb9ae1957',
};

// Инициализация приложения Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Экспортируйте auth и db для использования в других файлах
export { auth, db };
