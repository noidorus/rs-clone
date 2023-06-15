import { loadImageToStorage, deletePhotoFromStorage } from './storage';
import {
  IComment,
  IPhoto,
  IUser,
  IUserProfile,
  IPhotoDoc,
} from './../types/types';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  QuerySnapshot,
  DocumentData,
  deleteDoc,
} from 'firebase/firestore';
import { db, auth } from './lib';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { CreateUserProps } from './types';

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  try {
    return await auth.signOut();
  } catch (err) {
    throw err;
  }
};

export const createUser = async ({
  username,
  fullName,
  email,
  password,
}: CreateUserProps): Promise<void> => {
  const usernameExists = await doesUsernameExist(username);
  if (!usernameExists) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });

      const newUser = {
        userId: userCredential.user.uid,
        username,
        fullName,
        emailAddress: email,
        following: [],
        followers: [],
        dateCreated: Date.now(),
        avatarData: {
          avatarSrc: '',
          imagePath: '',
        },
      };

      await createUserDocument(newUser);
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error('That username is already taken, please try another!');
  }
};

export const doesUsernameExist = async (username: string): Promise<boolean> => {
  const querySnapshot = await getQuerySnapshot('users', 'username', username);
  return querySnapshot.docs.length > 0;
};

export const isFollowingUserProfile = async (
  loggedUserName: string | null | undefined,
  profileUserId: string
): Promise<boolean> => {
  const usersColl = collection(db, 'users');
  const userQuery = query(usersColl, where('username', '==', loggedUserName));
  const newQuery = query(
    userQuery,
    where('following', 'array-contains', profileUserId)
  );
  const res = await getDocs(newQuery);

  return res.docs.length > 0;
};

const getQuerySnapshot = async (
  collName: string,
  fieldPath: string,
  value: string
): Promise<QuerySnapshot<DocumentData>> => {
  const coll = collection(db, collName);
  const userQuery = query(coll, where(fieldPath, '==', value));

  return await getDocs(userQuery);
};

const createUserDocument = async (userData: IUser): Promise<void> => {
  const userColl = collection(db, 'users');
  const userRef = doc(userColl);

  setDoc(userRef, userData);
};

export const createNewPhoto = async (
  img: File,
  caption: string,
  userId: string
): Promise<IPhotoDoc> => {
  try {
    const { downloadUrl, imagePath } = await loadImageToStorage(img);
    const imageData = {
      caption: caption,
      comments: [],
      dateCreated: Date.now(),
      imageSrc: downloadUrl,
      likes: [],
      imagePath: imagePath,
      userId: userId,
    };

    const photoColl = collection(db, 'photos');
    const photoRef = doc(photoColl);
    await setDoc(photoRef, imageData);
    return { ...imageData, docId: photoRef.id };
  } catch (err) {
    throw err;
  }
};

export const updateUserAvatar = async (
  img: File,
  docId: string,
  oldAvatarPath?: string
) => {
  try {
    const { downloadUrl, imagePath } = await loadImageToStorage(img);

    if (oldAvatarPath) {
      await deletePhotoFromStorage(oldAvatarPath);
    }

    const docRef = doc(db, 'users', docId);

    await updateDoc(docRef, {
      avatarData: { avatarSrc: downloadUrl, imagePath },
    });

    return { avatarSrc: downloadUrl, imagePath };
  } catch (err) {
    throw err;
  }
};

export const updateUserData = async (
  newUsername: string,
  newFullname: string,
  docId: string
): Promise<void> => {
  const userColl = collection(db, 'users');
  const docRef = doc(userColl, docId);

  await updateDoc(docRef, {
    username: newUsername,
    fullName: newFullname,
  }).catch((err) => {
    throw err;
  });
};

export const deletePhotoFromFirebase = async (
  deletePath: string,
  docId: string
): Promise<void> => {
  const docRef = doc(db, 'photos', docId);
  try {
    await deletePhotoFromStorage(deletePath);

    return await deleteDoc(docRef);
  } catch (err) {
    throw err;
  }
};

export const updateComments = async (
  data: IComment,
  docId: string
): Promise<IComment[]> => {
  const photoColl = collection(db, 'photos');
  const docRef = doc(photoColl, docId);
  const photoDoc = await getDoc(docRef);
  const { comments } = photoDoc.data() as IPhoto;

  const newCommentsArr = [...comments, data];

  await updateDoc(docRef, { comments: newCommentsArr }).catch((e) =>
    console.log(e)
  );

  return newCommentsArr;
};
////////////

async function updateLoggedUserFollowing(
  isFollowingProfile: boolean,
  loggedDocId: string,
  userId: string
): Promise<void> {
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
): Promise<void> {
  if (loggedUserId && loggedDocId) {
    await updateLoggedUserFollowing(isFollowingProfile, loggedDocId, userId);
    await updateFollowedUserFollowers(isFollowingProfile, docId, loggedUserId);
  }
}

export async function updateFollowedUserFollowers(
  isFollowingProfile: boolean,
  docId: string,
  loggedUserId: string
): Promise<void> {
  const docRef = doc(db, 'users', docId);
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

export async function getUserByUserId(
  userId: string
): Promise<IUserProfile | null> {
  const querySnapshot = await getQuerySnapshot('users', 'userId', userId);
  const [res] = querySnapshot.docs.map((item) => {
    const itemData = item.data() as IUser;
    return {
      ...itemData,
      docId: item.id,
    };
  });

  return res ? res : null;
}

export async function setDataUsers(): Promise<IUserProfile[]> {
  const usersColection = collection(db, 'users');
  const usersData = await getDocs(usersColection);
  const users = usersData.docs.map((user) => {
    const data = user.data() as IUser;
    return { ...data, docId: user.id };
  });
  return users;
}

export async function getUserByUsername(
  username: string
): Promise<IUserProfile | undefined> {
  const querySnapshot = await getQuerySnapshot('users', 'username', username);

  const res = querySnapshot.docs.map((item) => {
    const itemData = item.data() as IUser;
    return {
      ...itemData,
      docId: item.id,
    };
  });

  return !!res.length ? res[0] : undefined;
}

export async function getPhotosByUserId(userId: string): Promise<IPhotoDoc[]> {
  const photosQuery = await getQuerySnapshot('photos', 'userId', userId);

  return photosQuery.docs.map((photo) => {
    const photoData = photo.data() as IPhoto;
    return {
      ...photoData,
      docId: photo.id,
    };
  });
}

export async function toggleLike(
  isLikedPhoto: boolean,
  docId: string,
  loggedUserId: string
): Promise<void> {
  const photoColl = collection(db, 'photos');
  const docRef = doc(photoColl, docId);
  const photoDoc = await getDoc(docRef);
  const { likes } = photoDoc.data() as IPhoto;

  if (!isLikedPhoto) {
    updateDoc(docRef, { likes: [...likes, loggedUserId] }).catch((e) =>
      console.log(e)
    );
  } else {
    const newArr = likes.filter((val) => val != loggedUserId);
    updateDoc(docRef, { likes: newArr }).catch((e) => console.log(e));
  }
}

export async function deleteComment(
  docId: string,
  date: number
): Promise<IComment[]> {
  const photoColl = collection(db, 'photos');
  const docRef = doc(photoColl, docId);
  const photoDoc = await getDoc(docRef);
  const { comments } = photoDoc.data() as IPhoto;

  const newCommentsArr = comments.filter((elem) => elem.date != date);

  await updateDoc(docRef, { comments: newCommentsArr }).catch((e) =>
    console.log(e)
  );
  return newCommentsArr;
}
