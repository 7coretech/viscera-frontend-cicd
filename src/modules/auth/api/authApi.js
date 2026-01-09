import api from 'src/api';

export const loginUser = (data) => {
  return api('/api/v1/auth/login', data, 'post');
};

export const registerUser = (data) => {
  return api('/api/v1/auth/register', data, 'post');
};

export const getProfile = () => {
  return api('/api/v1/users/profile', {}, 'get');
};

export const postTravelPreference = (data) => {
  return api('/api/v1/nurses/travel', data, 'post');
};

export const postProfilePreferences = (data) => {
  return api('/api/v1/nurses/preferences', data, 'post');
};

export const postExperience = (data) => {
  return api('/api/v1/nurses/experiences', data, 'post');
};


export const postSkills = (data) => {
  return api('/api/v1/nurses/skills', data, 'post');
};

export const postAvailability = (data) => {
  return api('/api/v1/nurses/availability', data, 'post');
};

export const getCompletionScore = () => {
  return api('/api/v1/nurses/completion-score', {}, 'get');
};
