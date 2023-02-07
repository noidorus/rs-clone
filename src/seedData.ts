import { IUser } from './types/types';

import {
  collection,
  doc,
  setDoc,
  CollectionReference,
  DocumentData,
  Firestore,
} from 'firebase/firestore';

export function seedDatabase(db: Firestore) {
  const users: IUser[] = [
    {
      userId: 'Si6wMvi2gfcEKo17bWJ7FQayYNJ2',
      username: 'huffpuff',
      fullName: 'Huff Puff',
      emailAddress: 'huffpuff@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['Si6wMvi2gfcEKo17bWJ7FQayYNJ2'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['Si6wMvi2gfcEKo17bWJ7FQayYNJ2'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['Si6wMvi2gfcEKo17bWJ7FQayYNJ2'],
      dateCreated: Date.now(),
    },
  ];

  const createCollection = <T = DocumentData>(collectionName: string, db: Firestore) => {
    return collection(db, collectionName) as CollectionReference<T>;
  };

  for (let i = 0; i < users.length; i += 1) {
    const usersColl = createCollection<IUser>('users', db);
    const userRef = doc(usersColl);
    setDoc(userRef, users[i]);
  }

  for (let i = 1; i < 5; i += 1) {
    const photoColl = createCollection('photos', db);
    const photoRef = doc(photoColl);
    setDoc(photoRef, {
      photoId: i,
      userId: '2',
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: 'Saint George and the Dragon',
      likes: [],
      comments: [
        {
          displayName: 'dali',
          comment: 'Love this place, looks like my animal farm!',
        },
        {
          displayName: 'orwell',
          comment: 'Would you mind if I used this picture?',
        },
      ],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: Date.now(),
    });
  }
}
