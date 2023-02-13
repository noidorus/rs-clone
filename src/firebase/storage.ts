import { uuidv4 } from '@firebase/util';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebase } from './lib';

// type CallBackType = (url: string, imageId: string) => void;
type CallBackType = (url: string, imageId: string) => void;

export function loadImageToStorage(image: File, callback: CallBackType) {
  const storage = getStorage(firebase);

  const imageId = uuidv4();
  const uploadPath = `/images/${imageId}`; // geting the image path
  const storageRef = ref(storage, uploadPath); // getting the storageRef

  uploadBytes(storageRef, image).then(() => {
    getDownloadURL(storageRef).then((url) => {
      callback(url, imageId);
    });
  });
}
