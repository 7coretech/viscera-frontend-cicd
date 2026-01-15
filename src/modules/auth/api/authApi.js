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
// GET nurse travel preference
export const getTravelPreference = () => {
  return api('/api/v1/nurses/travel', {}, 'get', true);
};

export const postProfilePreferences = (data) => {
  return api('/api/v1/nurses/preferences', data, 'post');
};

export const postExperience = (data) => {
  return api('/api/v1/nurses/experiences', data, 'post');
};
// GET nurse experiences
export const getExperiences = () => {
  return api('/api/v1/nurses/experiences', {}, 'get', true);
};


export const postSkills = (data) => {
  return api('/api/v1/nurses/skills', data, 'post');
};

// GET nurse skills
export const getSkills = () => {
  return api('/api/v1/nurses/skills', {}, 'get', true);
};

export const postAvailability = (data) => {
  return api('/api/v1/nurses/availability', data, 'post');
};
// GET nurse availability
export const getAvailability = () => {
  return api('/api/v1/nurses/availability', {}, 'get', true);
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
// GET nurse licenses
export const getLicenses = () => {
  return api('/api/v1/nurses/licenses', {}, 'get', true);
};

export const postCompensation = (data) => {
  return api('/api/v1/nurses/compensation', data, 'post');
};



// GET nurse compensation
export const getCompensation = () => {
  return api('/api/v1/nurses/compensation', {}, 'get', true);
};

export const postDocument = (data) => {
  return api('/api/v1/nurses/documents', data, 'post');
};

// GET nurse documents
export const getDocuments = () => {
  return api('/api/v1/nurses/documents', {}, 'get', true);
};
export const postResume = (data) => {
  return api('/api/v1/nurses/resumes', data, 'post');
};
// GET nurse resumes
export const getResumes = () => {
  return api('/api/v1/nurses/resumes', {}, 'get', true);
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
export const getAccountProfile = () => {
  return api('/api/v1/account/', {}, 'get', true);
};

export const getProfilePreferences = () => {
  return api('/api/v1/nurses/preferences', {}, 'get', true);
};
