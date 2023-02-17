import { IPhoto } from './../types/types';
import { IUser, MyError } from '../types/types';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { db, firebase } from './lib';

export async function doesUsernameExist(username: string) {
  const querySnapshot = await getQuerySnapshot('users', 'username', username);
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
}

async function updateLoggedUserFollowing(
  isFollowingProfile: boolean,
  loggedDocId: string,
  userId: string
) {
  const userColl = collection(db, 'users');
  const docRef = doc(userColl, loggedDocId);
  const querySnapshot = await getDoc(docRef);
  const { following } = querySnapshot.data() as IUser;

  if (!isFollowingProfile) {
    updateDoc(docRef, { following: [...following, userId] }).catch((err) =>
      console.log(err)
    );
  } else {
    const newArr = following.filter((val) => val != userId);
    updateDoc(docRef, { following: newArr }).catch((err) => console.log(err));
  }
}

export async function toggleFollow(
  isFollowingProfile: boolean,
  userId: string,
  docId: string,
  loggedUserId: string | undefined,
  loggedDocId: string | undefined
) {
  if (loggedUserId && loggedDocId) {
    await updateLoggedUserFollowing(isFollowingProfile, loggedDocId, userId);
    await updateFollowedUserFollowers(isFollowingProfile, docId, loggedUserId);
  }
}

export async function updateFollowedUserFollowers(
  isFollowingProfile: boolean,
  docId: string,
  loggedUserId: string
) {
  const userColl = collection(db, 'users');
  const docRef = doc(userColl, docId);
  const querySnapshot = await getDoc(docRef);
  const { followers } = querySnapshot.data() as IUser;

  if (!isFollowingProfile) {
    updateDoc(docRef, {
      followers: [...followers, loggedUserId],
    }).catch((err) => console.log(err));
  } else {
    const newArr = followers.filter((val) => val != loggedUserId);
    updateDoc(docRef, { followers: newArr }).catch((err) => console.log(err));
  }
}

export async function getUserByUserId(userId: string) {
  const querySnapshot = await getQuerySnapshot('users', 'userId', userId);

  const [res] = querySnapshot.docs.map((item) => {
    const itemData = item.data() as IUser;
    return {
      ...itemData,
      docId: item.id,
    };
  });

  return res;
}



export async function setDataUsers() {
  const usersColection = collection(db, 'users');
  const usersData = await getDocs(usersColection);
  const users = usersData.docs.map((user) => user.data());
  return users;
}


export async function getQuerySnapshot(
  collName: string,
  fieldPath: string,
  value: string
) {
  const coll = collection(db, collName);
  const userQuery = query(coll, where(fieldPath, '==', value));

  return await getDocs(userQuery);
}

export async function getUserByUsername(username: string) {
  const querySnapshot = await getQuerySnapshot('users', 'username', username);

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

export async function getPhotosByUserId(userId: string) {
  const photosQuery = await getQuerySnapshot('photos', 'userId', userId)

  return photosQuery.docs.map((photo) => {
    const photoData = photo.data() as IPhoto; 
    return {
      ...photoData,
      docId: photo.id,
    };
  })
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

    const avatarData = {
      avatarSrc: url,
      imagePath: imagePath,
    };

    await updateDoc(docRef, { avatarData })
      .then()
      .catch((error) => {
        console.log(error);
      });
  }
}

export async function updateUserData(
  newUsername: string,
  newFullname: string,
  docId: string | undefined
) {
  if (docId) {
    const userColl = collection(db, 'users');
    const docRef = doc(userColl, docId);

    updateDoc(docRef, {
      username: newUsername,
      fullName: newFullname,
    }).catch((err) => console.log(err));
  }
}
