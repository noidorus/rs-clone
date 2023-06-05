import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/setupStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
