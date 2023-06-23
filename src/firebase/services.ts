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
import { CreateUserProps, ToggleFollowProps } from './types';

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

export const deleteComment = async (
  date: number,
  docId: string
): Promise<IComment[]> => {
  const photoColl = collection(db, 'photos');
  const docRef = doc(photoColl, docId);
  const photoDoc = await getDoc(docRef);
  const { comments } = photoDoc.data() as IPhoto;

  const newCommentsArr = comments.filter((elem) => elem.date != date);

  await updateDoc(docRef, { comments: newCommentsArr }).catch((e) =>
    console.log(e)
  );
  return newCommentsArr;
};

export const updateLikes = async (
  isLikedPhoto: boolean,
  docId: string,
  loggedUserId: string
): Promise<string[]> => {
  const photoColl = collection(db, 'photos');
  const docRef = doc(photoColl, docId);
  const photoDoc = await getDoc(docRef);
  const { likes } = photoDoc.data() as IPhoto;
  const newLikes = !isLikedPhoto
    ? [...likes, loggedUserId]
    : likes.filter((val) => val != loggedUserId);

  await updateDoc(docRef, { likes: newLikes }).catch((e) => console.log(e));
  return newLikes;
};

export const updateFollow = async ({
  isFollowingProfile,
  userId,
  docId,
  loggedUserId,
  loggedDocId,
}: ToggleFollowProps) => {
  try {
    const newFollowing = await updateLoggedUserFollowing(
      isFollowingProfile,
      loggedDocId,
      userId
    );
    const newFollowers = await updateUserFollowers(
      isFollowingProfile,
      docId,
      loggedUserId
    );

    return { newFollowing, newFollowers };
  } catch (err) {
    throw err;
  }
};

const updateLoggedUserFollowing = async (
  isFollowingProfile: boolean,
  loggedDocId: string,
  userId: string
): Promise<string[]> => {
  try {
    const docRef = doc(db, 'users', loggedDocId);
    const querySnapshot = await getDoc(docRef);
    const { following } = querySnapshot.data() as IUser;

    const newFolowing = isFollowingProfile
      ? following.filter((val) => val != userId)
      : [...following, userId];

    await updateDoc(docRef, { following: newFolowing });

    return newFolowing;
  } catch (err) {
    throw err;
  }
};

const updateUserFollowers = async (
  isFollowingProfile: boolean,
  docId: string,
  loggedUserId: string
): Promise<string[]> => {
  try {
    const docRef = doc(db, 'users', docId);
    const querySnapshot = await getDoc(docRef);
    const { followers } = querySnapshot.data() as IUser;

    const newFollowers = isFollowingProfile
      ? followers.filter((val) => val != loggedUserId)
      : [...followers, loggedUserId];

    await updateDoc(docRef, { followers: newFollowers });

    return newFollowers;
  } catch (err) {
    throw err;
  }
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

export const getPhotosByUserIds = async (userIds: string[]) => {
  const photosRef = collection(db, 'photos');
  const photosQuery = query(photosRef, where('userId', 'in', userIds));
  const { docs } = await getDocs(photosQuery);

  return docs
    .map((item) => {
      return {
        docId: item.id,
        ...(item.data() as IPhoto),
      };
    })
    .sort((a, b) => b.dateCreated - a.dateCreated);
};

export const getUsersByUserId = async (
  userIds: string[]
): Promise<IUserProfile[]> => {
  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, where('userId', 'in', userIds));
  const { docs } = await getDocs(usersQuery);

  return docs.map((item) => {
    return {
      docId: item.id,
      ...(item.data() as IUser),
    };
  });
};

export const getUserByUserId = async (
  userId: string
): Promise<IUserProfile | null> => {
  const querySnapshot = await getQuerySnapshot('users', 'userId', userId);
  const [res] = querySnapshot.docs.map((item) => {
    return {
      docId: item.id,
      ...(item.data() as IUser),
    };
  });

  return res ? res : null;
};

export const getAllUsers = async (): Promise<IUserProfile[]> => {
  const usersColection = collection(db, 'users');
  const usersData = await getDocs(usersColection);

  return usersData.docs.map((user) => {
    const data = user.data() as IUser;
    return { ...data, docId: user.id };
  });
};

export const getUserByUsername = async (
  username: string
): Promise<IUserProfile | undefined> => {
  const querySnapshot = await getQuerySnapshot('users', 'username', username);

  const res = querySnapshot.docs.map((item) => {
    const itemData = item.data() as IUser;
    return {
      ...itemData,
      docId: item.id,
    };
  });

  return !!res.length ? res[0] : undefined;
};
