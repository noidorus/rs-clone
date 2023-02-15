import { IUser, MyError } from '../types/types';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './lib';

export async function doesUsernameExist(username: string) {
  const querySnapshot = await getQuerySnapshot(username, 'users');
  return querySnapshot.docs.length > 0;
}

export async function isFollowingUserProfile(
  loggedUserName: string | null | undefined,
  profileUserId: string
) {
  const usersColl = collection(db, 'users');
  const userQuery = query(usersColl, where('username', '==', loggedUserName));

  const newQuery = query(
    userQuery,
    where('following', 'array-contains', profileUserId)
  );

  const res = await getDocs(newQuery);

  return res.docs.length > 0;
  // return res.docs.map((item) => {
  //   const itemData = item.data() as IUser;
  //   return {
  //     ...itemData,
  //     docId: item.id,
  //   };
  // });
}

export async function setDataUsers() {
  const usersColection = collection(db, 'users');
  const usersData = await getDocs(usersColection);
  const users = usersData.docs.map((user) => user.data());
  return users;
}

export async function setDataPhotos() {
  const photosColection = collection(db, 'photos');
  const photosData = await getDocs(photosColection);
  const photos = photosData.docs.map((photo) => photo.data());
  return photos;
}

export async function getQuerySnapshot(username: string, collName: string) {
  const userColection = collection(db, collName);
  const userQuery = query(
    userColection,
    where('username', '==', username.toLowerCase())
  );

  return await getDocs(userQuery);
}

export async function getUserByUsername(username: string) {
  const querySnapshot = await getQuerySnapshot(username, 'users');

  const res = querySnapshot.docs.map((item) => {
    const itemData = item.data() as IUser;
    return {
      ...itemData,
      docId: item.id,
    };
  });

  return res[0];
}

export async function setUserData(user: IUser) {
  const userColl = collection(db, 'users');
  const userRef = doc(userColl);

  setDoc(userRef, user);
}

export function getError(error: MyError) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    default:
      return error.message;
  }
}

export function setPhotoData(
  photoId: string,
  path: string,
  userId: string,
  caption: string
) {
  const photoColl = collection(db, 'photos');
  const photoRef = doc(photoColl);

  const imageData = {
    caption: caption,
    comments: [],
    dateCreated: Date.now(),
    imageSrc: path,
    likes: [],
    imagePath: photoId,
    userId: userId,
  };

  setDoc(photoRef, imageData);
}

export async function updateUserAvatar(
  url: string,
  imagePath: string,
  userName: string | null | undefined
) {
  if (userName) {
    const userColl = collection(db, 'users');
    const user = await getUserByUsername(userName);
    const docRef = doc(userColl, user.docId);

    const avatarPath = {
      avatarData: {
        avatarSrc: url,
        imagePath: imagePath,
      },
    };

    await updateDoc(docRef, avatarPath)
      .then()
      .catch((error) => {
        console.log(error);
      });
  }
}
