import api from 'src/api';

export const getJobs = (data) => {
  return api('/jobs/my', data, 'get');
};

export const getAllJobs = (filters = {}) => {
  return api('/jobs/alljobs', {}, 'get', false, null, 'json', filters);
};

export const createJob = (data) => {
  return api("/jobs/add", data, "post");
};

export const saveJob = (jobId) => {
  return api(`/save/job/${jobId}`, {}, "post");
};

export const unsaveJob = (jobId) => {
  return api(`/save/remove/${jobId}`, {}, "delete");
};

export const getSavedJobs = (data) => {
  return api('/save/my-savedjob', data, 'get');
};

export const getMyResumes = (data) => {
  return api('/resume/get', data, 'get');
};

export const uploadResume = (formData) => {
  return api('/resume/upload', formData, 'post', true); 
};

export const applyJob = ({ jobId, data }) => {
  return api(`/jobapplications/${jobId}/apply`, data, 'post');
};

export const publishJob = ({ jobId }) => {
  return api(`/jobs/publish/${jobId}`, null, 'patch');
};
