import * as authTypes from './authTypes';

/**
 * LOGIN
 */
export const login = (data, resolve, reject) => ({
  type: authTypes.LOGIN,
  data,
  resolve,
  reject,
});

/**
 * REGISTER
 */
export const register = (data, resolve, reject) => ({
  type: authTypes.REGISTER,
  data,
  resolve,
  reject,
});

/**
 * LOGOUT
 */
export const logout = () => ({
  type: authTypes.LOGOUT,
});

/**
 * RESTORE SESSION
 */
export const restoreSession = () => ({
  type: authTypes.RESTORE_SESSION,
});

/**
 * SET AUTH USER
 */
export const setAuthUser = (user) => ({
  type: authTypes.SET_AUTH_USER,
  user,
});
