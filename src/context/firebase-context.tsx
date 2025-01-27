import { createContext } from 'react';

import type { FirebaseContextProps } from './types';

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export default FirebaseContext;
export type { FirebaseContextProps };
