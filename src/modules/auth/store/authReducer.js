import * as authTypes from './authTypes';

const initialState = {
  token: '',
  isAuthenticated: false,
  user: {},
  otpSent: false,
  deviceInfo:null
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    default:
      return state;

        case authTypes.SET_AUTH_USER:
      return { ...state, isAuthenticated: true, user: payload.user };

  }
};