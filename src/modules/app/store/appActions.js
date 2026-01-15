import * as appTypes from './appTypes';
import { createJob } from 'src/modules/auth/api/authApi'; // points to POST /api/v1/jobs


/* ===================== JOB LIST ===================== */

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

/* ===================== ALL JOBS ===================== */

export const fetchAllJobsRequest = (filters = {}, resolve, reject) => ({
  type: appTypes.FETCH_ALLJOBS_REQUEST,
  payload: filters,
  resolve,
  reject,
});

export const fetchAllJobsSuccess = (jobs) => ({
  type: appTypes.FETCH_ALLJOBS_SUCCESS,
  payload: jobs,
});

export const fetchAllJobsFailure = (error) => ({
  type: appTypes.FETCH_ALLJOBS_FAILURE,
  payload: error,
});

/* ===================== CREATE JOB ===================== */

/* ===================== CREATE JOB ===================== */

export const createJobRequest = (data, onSuccess, onError) => {
  return async (dispatch) => {
    try {
      const response = await createJob(data);

      if (response?.success) {
        dispatch(createJobSuccess(response.data));
        onSuccess && onSuccess(response.data);
      } else {
        dispatch(createJobFailure(response?.message || 'Error creating job'));
        onError && onError(response?.message || 'Error creating job');
      }
    } catch (err) {
      dispatch(createJobFailure(err.message || 'Error creating job'));
      onError && onError(err.message || 'Error creating job');
    }
  };
};

export const createJobSuccess = (job) => ({
  type: appTypes.CREATE_JOB_SUCCESS,
  payload: job,
});

export const createJobFailure = (error) => ({
  type: appTypes.CREATE_JOB_FAILURE,
  payload: error,
});


/* ===================== SAVE / UNSAVE JOB ===================== */

export const saveJobRequest = (jobId, resolve, reject) => ({
  type: appTypes.SAVE_JOB_REQUEST,
  payload: { jobId },
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
  payload: { jobId },
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

/* ===================== SAVED JOBS ===================== */

export const fetchSaveJobsRequest = (resolve, reject) => ({
  type: appTypes.FETCH_SAVE_JOBS_REQUEST,
  resolve,
  reject,
});

export const fetchSaveJobsSuccess = (jobs) => ({
  type: appTypes.FETCH_SAVE_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchSaveJobsFailure = (error) => ({
  type: appTypes.FETCH_SAVE_JOBS_FAILURE,
  payload: error,
});

/* ===================== RESUMES ===================== */

export const fetchMyResumesRequest = (resolve, reject) => ({
  type: appTypes.FETCH_MY_RESUMES_REQUEST,
  resolve,
  reject,
});

export const fetchMyResumesSuccess = (resumes) => ({
  type: appTypes.FETCH_MY_RESUMES_SUCCESS,
  payload: resumes,
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

/* ===================== APPLY JOB ===================== */

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

/* ===================== PUBLISH JOB ===================== */

export const publishJobRequest = (jobId, resolve, reject) => ({
  type: appTypes.PUBLISH_JOB_REQUEST,
  payload: { jobId },
  resolve,
  reject,
});

export const publishJobSuccess = (job) => ({
  type: appTypes.PUBLISH_JOB_SUCCESS,
  payload: job,
});

export const publishJobFailure = (error) => ({
  type: appTypes.PUBLISH_JOB_FAILURE,
  payload: error,
});
