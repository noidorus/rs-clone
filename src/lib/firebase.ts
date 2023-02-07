import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBaDvHPUZe--Aez_W44jDqaTqs4csapE5g',
  authDomain: 'rs-clone-instagram.firebaseapp.com',
  projectId: 'rs-clone-instagram',
  storageBucket: 'rs-clone-instagram.appspot.com',
  messagingSenderId: '306740386545',
  appId: '1:306740386545:web:280fd76936cc742b2ba750',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;


export { firebase, FieldValue };
