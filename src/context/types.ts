import { Firestore } from 'firebase/firestore';
import Firebase from 'firebase/app';
import { Auth } from 'firebase/auth';

export interface FirebaseContextProps {
  firebase: Firebase.FirebaseApp;
  db: Firestore;
  auth: Auth;
}
