import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../redux/setupStore';
import { Status } from '../redux/slices/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectLoading = () =>
  useAppSelector(({ dashboard, profile }) => {
    if (
      dashboard.loadingStatus === Status.LOADING ||
      profile.loadingStatus === Status.LOADING
    ) {
      return true;
    }
    return false;
  });

export const selectIsFolowingProfile = () =>
  useAppSelector(({ userInfo, profile }) => {
    const { loggedUser } = userInfo;
    const { user } = profile;
    if (loggedUser && user) {
      const { following } = loggedUser;
      console.log('following: ', following);
      console.log('user.userId: ', user.userId);
      const isFollowingProfile = following.indexOf(user.userId);
      console.log('isFollowingProfile: ', isFollowingProfile);
      return isFollowingProfile === -1 ? false : true;
    }

    return false;
  });
