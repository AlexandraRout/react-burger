import { useAppDispatch, useAppSelector } from '../types/typed-redux-hooks';
import { fetchUser } from '../services/user/user.thunks';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);

  const checkAuth = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      dispatch(fetchUser());
    }

    return undefined;
  };

  return {
    user,
    isAuth: !!user,
    isLoading,
    checkAuth,
  };
};

export default useAuth;
