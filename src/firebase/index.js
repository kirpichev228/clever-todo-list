import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB-FlZ3sCzIKFKDSi3RD8imyEd-She8srw',
  authDomain: 'clever-todo-list-51118.firebaseapp.com',
  projectId: 'clever-todo-list-51118',
  storageBucket: 'clever-todo-list-51118.appspot.com',
  messagingSenderId: '611139966705',
  appId: '1:611139966705:web:5977bdf89c7e334b0a3b50',
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
export const db = getFirestore(app);
