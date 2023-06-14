import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import type { Auth, User } from 'firebase/auth';

const config = {
  apiKey: process.env.API_KEY as string,
  authDomain: process.env.AUTH_DOMAIN as string,
  projectId: process.env.PROJECT_ID as string,
  storageBucket: process.env.STORAGE_BUCKET as string,
  messagingSenderId: process.env.MESSAGING_SENDER_ID as string,
  appId: process.env.APP_ID as string,
};

const firebase = initializeApp(config);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

export { firebase, db, auth };
export type { User, Auth };
