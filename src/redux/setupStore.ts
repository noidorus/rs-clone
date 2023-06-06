import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import dashboard from './slices/mainPageSlice';
import profile from './slices/profileSlice';
import auth from './slices/authSlice';

const rootReducer = combineReducers({
  dashboard,
  profile,
  auth,
});

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  // store.dispatch(listenToAuthChanges());
  return store;
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export { setupStore };
