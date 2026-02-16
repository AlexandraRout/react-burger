import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../services/user/user.thunks';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

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
