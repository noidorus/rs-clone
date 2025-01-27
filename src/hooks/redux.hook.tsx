import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../redux/setupStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectIsFolowingProfile = () =>
  useAppSelector(({ userCenter }) => {
    const { loggedUser, userProfile } = userCenter;
    if (loggedUser && userProfile) {
      const isFollowingProfile = loggedUser.following.indexOf(
        userProfile.userId
      );
      return isFollowingProfile === -1 ? false : true;
    }

    return false;
  });
