import { reject } from 'lodash';
import * as appTypes from './appTypes';

// export const setAppLoading = (loading) => ({
//   type: appTypes.SET_APP_LOADING,
//   loading,
// });

export const fetchJobsRequest = () => ({
  type: appTypes.FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = (jobs) => ({
  type: appTypes.FETCH_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchJobsFailure = (error) => ({
  type: appTypes.FETCH_JOBS_FAILURE,
  payload: error,
});

export const fetchAllJobsRequest = (filters = {}) => ({
  type: appTypes.FETCH_ALLJOBS_REQUEST,
  payload: filters,
});

export const fetchAllJobsSuccess = (jobs) => ({
  type: appTypes.FETCH_ALLJOBS_SUCCESS,
  payload: jobs,
});

export const fetchAllJobsFailure = (error) => ({
  type: appTypes.FETCH_ALLJOBS_FAILURE,
  payload: error,
});

export const createJobRequest = (data, resolve, reject) => ({
  type: appTypes.CREATE_JOB_REQUEST,
  data,
  resolve,
  reject,
});

export const createJobSuccess = (payload) => ({
  type: appTypes.CREATE_JOB_SUCCESS,
  payload,
});

export const createJobFailure = (error) => ({
  type: appTypes.CREATE_JOB_FAILURE,
  error,
});

export const saveJobRequest = (jobId, resolve, reject) => ({
  type: appTypes.SAVE_JOB_REQUEST,
  jobId,
  resolve,
  reject,
});

export const saveJobSuccess = (data) => ({
  type: appTypes.SAVE_JOB_SUCCESS,
  payload: data,
});

export const saveJobFailure = (error) => ({
  type: appTypes.SAVE_JOB_FAILURE,
  payload: error,
});

export const unsaveJobRequest = (jobId, resolve, reject) => ({
  type: appTypes.UNSAVE_JOB_REQUEST,
  jobId,
  resolve,
  reject,
});

export const unsaveJobSuccess = (data) => ({
  type: appTypes.UNSAVE_JOB_SUCCESS,
  payload: data,
});

export const unsaveJobFailure = (error) => ({
  type: appTypes.UNSAVE_JOB_FAILURE,
  payload: error,
});

export const fetchSaveJobsRequest = () => ({
  type: appTypes.FETCH_SAVE_JOBS_REQUEST,
});

export const fetchSaveJobsSuccess = (jobs) => ({
  type: appTypes.FETCH_SAVE_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchSaveJobsFailure = (error) => ({
  type: appTypes.FETCH_SAVE_JOBS_FAILURE,
  payload: error,
});

export const fetchMyResumesRequest = () => ({
  type: appTypes.FETCH_MY_RESUMES_REQUEST,
});

export const fetchMyResumesSuccess = (jobs) => ({
  type: appTypes.FETCH_MY_RESUMES_SUCCESS,
  payload: jobs,
});

export const fetchMyResumesFailure = (error) => ({
  type: appTypes.FETCH_MY_RESUMES_FAILURE,
  payload: error,
});

export const uploadResumeRequest = (formData, resolve, reject) => ({
  type: appTypes.UPLOAD_RESUME_REQUEST,
  payload: formData,
  resolve,
  reject,
});

export const uploadResumeSuccess = (resumes) => ({
  type: appTypes.UPLOAD_RESUME_SUCCESS,
  payload: resumes,
});

export const uploadResumeFailure = (error) => ({
  type: appTypes.UPLOAD_RESUME_FAILURE,
  payload: error,
});

export const applyJobRequest = (jobId, data, resolve, reject) => ({
  type: appTypes.APPLY_JOB_REQUEST,
  payload: { jobId, data },
  resolve,
  reject,
});

export const applyJobSuccess = (response) => ({
  type: appTypes.APPLY_JOB_SUCCESS,
  payload: response,
});

export const applyJobFailure = (error) => ({
  type: appTypes.APPLY_JOB_FAILURE,
  payload: error,
});

export const publishJobRequest = (jobId, resolve, reject) => ({
  type: appTypes.PUBLISH_JOB_REQUEST,
  payload: { jobId },
  resolve,
  reject,
});

export const publishJobSuccess = (response) => ({
  type: appTypes.PUBLISH_JOB_SUCCESS,
  payload: response,
});

export const publishJobFailure = (error) => ({
  type: appTypes.PUBLISH_JOB_FAILURE,
  payload: error,
});
