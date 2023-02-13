import { uuidv4 } from '@firebase/util';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebase } from './lib';

// type CallBackType = (url: string, imageId: string) => void;
type CallBackType = (url: string, imagePath: string) => void;

export function loadImageToStorage(image: File, callback: CallBackType) {
  const storage = getStorage(firebase);

  const imageId = uuidv4();
  const imagePath = `/images/${imageId}`; // geting the image path
  const storageRef = ref(storage, imagePath); // getting the storageRef

  uploadBytes(storageRef, image).then(() => {
    getDownloadURL(storageRef).then((url) => {
      callback(url, imagePath);
    });
  });
}
