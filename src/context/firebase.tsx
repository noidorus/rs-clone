import { Firestore } from 'firebase/firestore';
import { createContext } from 'react';
import Firebase from 'firebase/app';
// import { FieldValue } from '../lib/firebase';

interface IFirebase {
  firebase: Firebase.FirebaseApp;
  db: Firestore;
}

const FirebaseContext = createContext<IFirebase | null>(null);
export default FirebaseContext;

