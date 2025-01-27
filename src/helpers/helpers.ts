import { IUserProfile } from '../types/types';
import { MyError } from './types';

export function getRelativeTimeString(date: number, lang = navigator.language) {
  const deltaSeconds = Math.round((date - Date.now()) / 1000);
  if (Math.abs(deltaSeconds) > 3600 * 24 * 3) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } else {
    const cutoffs = [60, 3600, 3600 * 24, 3600 * 24 * 7];
    const units: Intl.RelativeTimeFormatUnit[] = [
      'second',
      'minute',
      'hour',
      'day',
    ];
    const unitIndex = cutoffs.findIndex(
      (cutoff) => cutoff > Math.abs(deltaSeconds)
    );
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
    const rtf = new Intl.RelativeTimeFormat('en', {});
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
  }
}

export function shuffle(array: IUserProfile[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getAuthError = (e: unknown): string => {
  const error = e as MyError;
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed.';
    case 'auth/user-not-found':
      return 'User not found!';
    case 'auth/wrong-password':
      return 'Wrong username or password!';
    case 'auth/too-many-requests':
      return 'Too many requests!';
    default:
      return error.message;
  }
};
