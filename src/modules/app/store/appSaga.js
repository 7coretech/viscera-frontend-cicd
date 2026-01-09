import { all, fork, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { jwtDecode } from 'jwt-decode';
import * as appTypes from './appTypes';
import * as appActions from './appActions';
import { replace } from 'redux-first-history';
import { extractParams, replaceParams } from '../../../../src/utils/url';
import storage from 'src/utils/storageUtils';
import * as appApi from '../api/appApi';

function* fetchJobsSaga({ token, resolve, reject }) {
  try {
    const response = yield call(appApi.getJobs, token);

    if (response && Array.isArray(response.data)) {
      yield put(appActions.fetchJobsSuccess(response.data));

      // Resolve the promise with the job data
      if (resolve) resolve(response.data);
    } else {
      const error = new Error("Invalid data format received from API");
      yield put(appActions.fetchJobsFailure(error.message));
      if (reject) reject(error);
    }
  } catch (error) {
    console.error("Fetch jobs error:", error);
    yield put(appActions.fetchJobsFailure(error.message || "Something went wrong"));
    if (reject) reject(error);
  }
}

function* fetchAllJobsSaga({ payload, resolve, reject }) {
  try {
    const response = yield call(appApi.getAllJobs, payload);

    if (response && Array.isArray(response.data)) {
      yield put(appActions.fetchAllJobsSuccess(response.data));
      if (resolve) resolve(response.data);
    } else {
      const error = new Error("Invalid data format received from API");
      yield put(appActions.fetchAllJobsFailure(error.message));
      if (reject) reject(error);
    }
  } catch (error) {
    console.error("Fetch jobs error:", error);
    yield put(appActions.fetchAllJobsFailure(error.message || "Something went wrong"));
    if (reject) reject(error);
  }
}

function* handleCreateJob({ data, resolve, reject }) {
  try {
    const response = yield call(appApi.createJob, data);
    yield put(appActions.createJobSuccess(response?.data));
    if (resolve) resolve(response);
  } catch (error) {
    console.error("Create Job Error:", error);
    yield put(appActions.createJobFailure(error));
    if (reject) reject(error);
  }
}

function* handleSaveJob({ jobId, resolve, reject }) {
  try {
    const response = yield call(appApi.saveJob, jobId);
    const data = response?.data || response;

    if (data?.success && data?.saved?.jobId) {
      yield put(appActions.saveJobSuccess(data.saved.jobId)); // just pass jobId
      if (resolve) resolve(data);
    } else {
      const error = new Error(data?.message || "Failed to save job");
      yield put(appActions.saveJobFailure(error.message));
      if (reject) reject(error);
    }
  } catch (error) {
    console.error("Save Job Error:", error);
    yield put(appActions.saveJobFailure(error.message || "Failed to save job"));
    if (reject) reject(error);
  }
}

function* handleUnSaveJob({ jobId, resolve, reject }) {
  try {
    const response = yield call(appApi.unsaveJob, jobId);
    const data = response?.data || response;

    if (data?.success && data?.saved?.jobId) {
      yield put(appActions.unsaveJobSuccess(data.saved.jobId)); // ✅ send only jobId
      if (resolve) resolve(data);
    } else {
      const error = new Error(data?.message || "Failed to unsave job");
      yield put(appActions.unsaveJobFailure(error.message));
      if (reject) reject(error);
    }
  } catch (error) {
    console.error("Unsave Job Error:", error);
    yield put(appActions.unsaveJobFailure(error.message || "Failed to unsave job"));
    if (reject) reject(error);
  }
}

function* fetchSaveJobsSaga({ token, resolve, reject }) {
  try {
    const response = yield call(appApi.getSavedJobs, token);

    const savedJobs = response?.savedJobs;

    if (Array.isArray(savedJobs)) {
      yield put(appActions.fetchSaveJobsSuccess(savedJobs));
      if (resolve) resolve(savedJobs);
    } else {
      const error = new Error("Invalid data format received from API");
      yield put(appActions.fetchSaveJobsFailure(error.message));
      if (reject) reject(error);
    }
  } catch (error) {
    console.error("Fetch jobs error:", error);
    yield put(appActions.fetchSaveJobsFailure(error.message || "Something went wrong"));
    if (reject) reject(error);
  }
}

function* fetchMyResumesSaga({ payload, resolve, reject }) {
  try {
    const response = yield call(appApi.getMyResumes, payload);

    console.log("Saga Response :", response)
    if (response?.resumes && Array.isArray(response.resumes)) {
      yield put(appActions.fetchMyResumesSuccess(response.resumes));
      if (resolve) resolve(response.resumes);
    }
    else {
      const error = new Error("Invalid data format received from API");
      yield put(appActions.fetchMyResumesFailure(error.message));
      if (reject) reject(error);
    }
  } catch (error) {
    console.error("Fetch jobs error:", error);
    yield put(appActions.fetchMyResumesFailure(error.message || "Something went wrong"));
    if (reject) reject(error);
  }
}

function* uploadResumeSaga({ payload, resolve, reject }) {
  try {
    const response = yield call(appApi.uploadResume, payload);

    if (response.success) {
      const resumes = Array.isArray(response.resumes) ? response.resumes : [response.resumes];

      yield put({ type: appTypes.UPLOAD_RESUME_SUCCESS, payload: resumes });
      if (resolve) resolve(resumes);
    } else {
      throw new Error(response.message || "Upload failed");
    }
  } catch (error) {
    yield put(appActions.uploadResumeFailure(error.message));
    if (reject) reject(error);
  }
}


function* applyJobSaga({ payload, resolve, reject }) {
  try {
    const response = yield call(appApi.applyJob, payload);
    if (response.success) {
      yield put(appActions.applyJobSuccess(response.application));
      if (resolve) resolve(response.application);
    } else {
      throw new Error(response.message || "Failed to apply job");
    }
  } catch (error) {
    yield put(appActions.applyJobFailure(error.message));
    if (reject) reject(error);
  }
}

function* publishJobSaga({ payload, resolve, reject }) {
  try {
    const response = yield call(appApi.publishJob, payload);
    if (response.success) {
      yield put(appActions.publishJobSuccess(response.data));
      if (resolve) resolve(response.data);
    } else {
      throw new Error(response.message || "Failed to publish job");
    }
  } catch (error) {
    yield put(appActions.publishJobFailure(error.message));
    if (reject) reject(error);
  }
}

function* watchJobs() {
  yield takeLatest(appTypes.CREATE_JOB_REQUEST, handleCreateJob);
  yield takeLatest(appTypes.FETCH_JOBS_REQUEST, fetchJobsSaga);
  yield takeLatest(appTypes.FETCH_ALLJOBS_REQUEST, fetchAllJobsSaga);
  yield takeLatest(appTypes.SAVE_JOB_REQUEST, handleSaveJob);
  yield takeLatest(appTypes.UNSAVE_JOB_REQUEST, handleUnSaveJob);
  yield takeLatest(appTypes.FETCH_SAVE_JOBS_REQUEST, fetchSaveJobsSaga);
  yield takeLatest(appTypes.FETCH_MY_RESUMES_REQUEST, fetchMyResumesSaga);
  yield takeLatest(appTypes.UPLOAD_RESUME_REQUEST, uploadResumeSaga);
  yield takeLatest(appTypes.APPLY_JOB_REQUEST, applyJobSaga);
yield takeLatest(appTypes.PUBLISH_JOB_REQUEST, publishJobSaga);

}

export default function* runSagas() {
  yield all([
    fork(watchJobs)
  ]);
}
