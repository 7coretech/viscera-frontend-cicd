import { all, fork, call, put, takeLatest, select } from '@redux-saga/core/effects';
import * as appTypes from './appTypes';
import * as appActions from './appActions';
import * as appApi from '../api/appApi';

/* ======================================================
   FETCH ALL JOBS
====================================================== */
function* fetchAllJobsSaga({ payload, resolve, reject }) {
  try {
    const response = yield call(appApi.getAllJobs, payload);

    const jobs =
      Array.isArray(response) ? response :
      Array.isArray(response?.data) ? response.data :
      Array.isArray(response?.data?.data) ? response.data.data :
      Array.isArray(response?.jobs) ? response.jobs :
      Array.isArray(response?.payload) ? response.payload :
      [];

    if (Array.isArray(jobs)) {
      yield put(appActions.fetchAllJobsSuccess(jobs));
      if (resolve) resolve(jobs);
    } else {
      throw new Error('Invalid jobs format');
    }
  } catch (error) {
    yield put(appActions.fetchAllJobsFailure(error.message));
    if (reject) reject(error);
  }
}

/* ======================================================
   SAVE JOB
====================================================== */
function* saveJobSaga(action) {
  try {
    const jobId = action.payload?.id; // MUST BE UUID

    if (!jobId) {
      throw new Error('Invalid jobId');
    }

    const response = yield call(appApi.saveJob, jobId);

    yield put({
      type: appTypes.SAVE_JOB_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appTypes.SAVE_JOB_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}


/* ======================================================
   APPLY JOB
====================================================== */
function* applyJobSaga({ payload, resolve, reject }) {
  try {
    const response = yield call(appApi.applyJob, { jobId: payload.jobId, ...(payload.data || {}) });
    const data = response?.data || response;

    if (data?.success) {
      yield put(appActions.applyJobSuccess({ jobId: payload.jobId }));
      if (resolve) resolve(data);
    } else {
      throw new Error(data?.message || 'Failed to apply job');
    }
  } catch (error) {
    console.error('Apply job error:', error);
    yield put(appActions.applyJobFailure(error.message));
    if (reject) reject(error);
  }
}

/* ======================================================
   FETCH SAVED JOBS
====================================================== */
function* fetchSavedJobsSaga({ resolve, reject }) {
  try {
    const response = yield call(appApi.getSavedJobs, {});
    const raw = response?.data ?? response;
    const list =
      Array.isArray(raw) ? raw :
      Array.isArray(raw?.data) ? raw.data :
      Array.isArray(raw?.records) ? raw.records :
      [];
    yield put(appActions.fetchSaveJobsSuccess(list));
    if (resolve) resolve(list);
  } catch (error) {
    const alljobs = yield select((s) => s.app?.alljobs || []);
    const savedList = alljobs
      .filter((j) => j.saved)
      .map((j) => ({ ...j, id: j._id || j.id, saved: true }));
    yield put(appActions.fetchSaveJobsSuccess(savedList));
    if (resolve) resolve(savedList);
  }
}

/* ======================================================
   WATCHERS
====================================================== */
function* watchJobs() {
  yield takeLatest(appTypes.FETCH_ALLJOBS_REQUEST, fetchAllJobsSaga);
  yield takeLatest(appTypes.SAVE_JOB_REQUEST, saveJobSaga);
  yield takeLatest(appTypes.APPLY_JOB_REQUEST, applyJobSaga);
  yield takeLatest(appTypes.FETCH_SAVE_JOBS_REQUEST, fetchSavedJobsSaga);
}

/* ======================================================
   ROOT SAGA
====================================================== */
export default function* runSagas() {
  yield all([fork(watchJobs)]);
}