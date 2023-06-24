import { uuidv4 } from '@firebase/util';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { firebase } from './lib';

export const loadImageToStorage = async (image: File) => {
  try {
    const storage = getStorage(firebase);
    const imageId = uuidv4();
    const imagePath = `/images/${imageId}`; // geting the image path
    const storageRef = ref(storage, imagePath); // getting the storageRef

    await uploadBytes(storageRef, image);
    const downloadUrl = await getDownloadURL(storageRef);
    return { downloadUrl, imagePath };
  } catch (err) {
    throw err;
  }
};

export const deletePhotoFromStorage = async (path: string): Promise<void> => {
  const storage = getStorage(firebase);
  const desertRef = ref(storage, path);

  try {
    return await deleteObject(desertRef);
  } catch (err) {
    throw err;
  }
};
