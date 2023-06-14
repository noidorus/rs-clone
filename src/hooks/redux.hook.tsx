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
