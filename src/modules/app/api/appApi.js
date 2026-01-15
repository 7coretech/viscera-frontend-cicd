import api from 'src/api';

/* ===================== JOBS ===================== */

// Get all jobs
export const getAllJobs = (params = {}) => {
  return api('/api/v1/jobs', {}, 'get', false, null, 'json', params);
};


// Get job by ID
export const getJobById = (jobId) => {
  return api(`/api/v1/jobs/${jobId}`, {}, 'get');
};


/* ===================== APPLICANT ===================== */

// Apply job
export const applyJob = (data) => {
  return api('/api/v1/applicant/apply', data, 'post');
};

// Save job
export const saveJob = (jobId) => {
  return api(
    '/api/v1/applicant/save',
    { jobId },
    'post'
  );
};



// Get saved jobs
export const getSavedJobs = (data = {}) => {
  return api('/api/v1/applicant/save', { action: 'list', ...data }, 'post');
};

// Check applied / saved jobs
export const checkAppliedOrSavedJobs = (data) => {
  return api('/api/v1/applicant/save', data, 'post');
};