import { createContext } from 'react';
import Firebase from 'firebase/compat/app';
import { FirebaseApp } from '@firebase/app-types';
import { FieldValue } from '../lib/firebase';

interface IFirebase {
  firebase: FirebaseApp;
  FieldValue: typeof FieldValue;
}

const FirebaseContext = createContext<IFirebase | null>(null);
export default FirebaseContext;

