import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBK_okOvQm4BhTEOGstdefVddxoJH-00i0',
  authDomain: 'sun-beam-school-website.firebaseapp.com',
  projectId: 'sun-beam-school-website',
  storageBucket: 'sun-beam-school-website.appspot.com',
  messagingSenderId: '708551435625',
  appId: '1:708551435625:web:ea25bff93f9b0d325b09f8',
  measurementId: 'G-J1H3YT3KN8',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
