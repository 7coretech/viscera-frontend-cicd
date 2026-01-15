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

// UPDATE PROFILE (General Information)
export const updateAccountProfile = (data) => {
  return api('/api/v1/account/', data, 'patch');
};

export const postLicense = (data) => {
  return api('/api/v1/nurses/licenses', data, 'post', true);
};

export const postCompensation = (data) => {
  return api('/api/v1/nurses/compensation', data, 'post');
};

export const postDocument = (data) => {
  return api('/api/v1/nurses/documents', data, 'post');
};

export const postResume = (data) => {
  return api('/api/v1/nurses/resumes', data, 'post');
};




/* ===================== ORGANIZATION ===================== */

// GET recruiter organization
export const getRecruiterOrganization = () => {
  return api(
    `/api/v1/recruiters/organization?ts=${Date.now()}`,
    null,
    'get'
  );
};


// POST recruiter organization
export const saveRecruiterOrganization = (data) => {
  return api(
    '/api/v1/recruiters/organization',
    data,
    'post',
    true,
    null,
    'json'
  );
};

// POST create new job
export const createJob = (data) => {
  return api('/api/v1/jobs', data, 'post', true, null, 'json');
};


