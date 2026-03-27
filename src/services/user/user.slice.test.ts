import reducer, { initialState } from './user.slice';
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser,
  resetPasswordUser,
  confirmPasswordReset,
} from './user.thunks';
import { IUser, IUserState } from '../../types';
import { deleteCookie, setCookie } from '../../utils/cookies';
import { mockUser as user } from '../../shared/mocks/user-mock';
import { unknownError } from '../../shared/unknown-error';

jest.mock('../../utils/cookies', () => ({
  getCookie: jest.fn(() => ''),
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

const loadingState: IUserState = { ...initialState, isLoading: true };

const authenticatedState: IUserState = {
  ...initialState,
  user,
  isAuthChecked: true,
};

describe('user reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Регистрация

  describe('registerUser', () => {
    it('should handle pending', () => {
      const state = reducer(
        initialState,
        registerUser.pending('', { name: '', email: '', password: '' }),
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled', () => {
      const state = reducer(
        loadingState,
        registerUser.fulfilled(user, '', { name: '', email: '', password: '' }),
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle rejected', () => {
      const state = reducer(
        loadingState,
        registerUser.rejected(null, '', { name: '', email: '', password: '' }, 'Ошибка регистрации'),
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка регистрации');
    });

    it('should set default error when rejected without rejectValue', () => {
      const state = reducer(
        loadingState,
        registerUser.rejected(null, '', { name: '', email: '', password: '' }),
      );

      expect(state.error).toBe(unknownError);
    });
  });

  // Авторизация (Логин)

  describe('loginUser', () => {
    it('should handle pending', () => {
      const state = reducer(
        initialState,
        loginUser.pending('', { email: '', password: '' }),
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });

    it('should handle fulfilled', () => {
      const state = reducer(
        loadingState,
        loginUser.fulfilled(user, '', { email: '', password: '' }),
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle rejected', () => {
      const state = reducer(
        loadingState,
        loginUser.rejected(null, '', { email: '', password: '' }, 'Ошибка входа'),
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка входа');
      expect(state.isAuthChecked).toBe(false);
    });
  });

  // Получение текущего пользователя

  describe('fetchUser', () => {
    it('should handle pending', () => {
      const state = reducer(initialState, fetchUser.pending(''));

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled', () => {
      const state = reducer(loadingState, fetchUser.fulfilled(user, ''));

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle rejected and delete accessToken cookie', () => {
      const state = reducer(
        loadingState,
        fetchUser.rejected(null, '', undefined, 'Ошибка получения пользователя'),
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка получения пользователя');
      expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    });
  });

  // Обновление данных пользователя

  describe('updateUser', () => {
    it('should handle pending', () => {
      const state = reducer(authenticatedState, updateUser.pending('', {}));

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled', () => {
      const updatedUser: IUser = { name: 'Updated', email: 'updated@example.com' };
      const state = reducer(
        { ...authenticatedState, isLoading: true },
        updateUser.fulfilled(updatedUser, '', {}),
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(updatedUser);
    });

    it('should handle rejected', () => {
      const state = reducer(
        { ...authenticatedState, isLoading: true },
        updateUser.rejected(null, '', {}, 'Ошибка обновления пользователя'),
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка обновления пользователя');
    });
  });

  // Выход из системы

  describe('logoutUser', () => {
    it('should handle fulfilled', () => {
      const state = reducer(
        authenticatedState,
        logoutUser.fulfilled(undefined, ''),
      );

      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });

    it('should handle rejected', () => {
      const state = reducer(
        authenticatedState,
        logoutUser.rejected(null, '', undefined, 'Ошибка выхода'),
      );

      expect(state.error).toBe('Ошибка выхода');
    });
  });

  // Смена пароля

  describe('resetPasswordUser', () => {
    it('should handle fulfilled and set cookie', () => {
      const state = reducer(
        initialState,
        resetPasswordUser.fulfilled({ success: true }, '', { email: 'test@example.com' }),
      );

      expect(state.forgotPasswordStep).toBe(true);
      expect(setCookie).toHaveBeenCalledWith('forgotPasswordStep', 'true', 20);
    });
  });

  // Подтверждение смены пароля

  describe('confirmPasswordReset', () => {
    it('should handle fulfilled and delete cookie', () => {
      const stateWithForgot: IUserState = { ...initialState, forgotPasswordStep: true };

      const state = reducer(
        stateWithForgot,
        confirmPasswordReset.fulfilled({ success: true }, '', { password: '123', token: 'abc' }),
      );

      expect(state.forgotPasswordStep).toBe(false);
      expect(deleteCookie).toHaveBeenCalledWith('forgotPasswordStep');
    });
  });
});
