import * as appTypes from './appTypes';
import { recomposeColor } from '@mui/material';
import { template } from 'lodash';


const initialState = {
  isLoading: false,
  job: [],
  jobs: [],
  alljobs: [],
  savejobs: [],
  myresumes: []
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    // case appTypes.SET_APP_LOADING:
    //   return { ...state, appLoading: payload.loading }; 

    case appTypes.FETCH_JOBS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case appTypes.FETCH_JOBS_SUCCESS:
      return { ...state, isLoading: false, jobs: payload.payload, error: null };

    case appTypes.FETCH_JOBS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case appTypes.FETCH_ALLJOBS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case appTypes.FETCH_ALLJOBS_SUCCESS:
      return { ...state, isLoading: false, alljobs: payload.payload, error: null };

    case appTypes.FETCH_ALLJOBS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case appTypes.CREATE_JOB_REQUEST:
      return {
        ...state, isLoading: true, error: null,
      };
    case appTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        job: [...state.job, payload.data],
      };
    case appTypes.CREATE_JOB_FAILURE:
      return { ...state, isLoading: false, error: payload.error };

    case appTypes.SAVE_JOB_REQUEST:
      return { ...state, isLoading: true, error: null };

    case appTypes.SAVE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alljobs: state.alljobs.map((job) =>
          job._id === payload.payload.jobId ? { ...job, saved: true } : job
        ),
      };

    case appTypes.SAVE_JOB_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case appTypes.UNSAVE_JOB_REQUEST:
      return { ...state, isLoading: true, error: null };

    case appTypes.UNSAVE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alljobs: state.alljobs.map((job) =>
          job._id === payload.payload.jobId ? { ...job, saved: false } : job
        ),
      };

    case appTypes.UNSAVE_JOB_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case appTypes.FETCH_SAVE_JOBS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case appTypes.FETCH_SAVE_JOBS_SUCCESS:
      return { ...state, isLoading: false, savejobs: payload, error: null };

    case appTypes.FETCH_SAVE_JOBS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case appTypes.FETCH_MY_RESUMES_REQUEST:
      return { ...state, isLoading: true, error: null };

    case appTypes.FETCH_MY_RESUMES_SUCCESS:
      return { ...state, isLoading: false, myresumes: payload.payload, error: null };

    case appTypes.FETCH_MY_RESUMES_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case appTypes.UPLOAD_RESUME_SUCCESS:
      return {
        ...state, myresumes: [...state.myresumes, ...(payload.payload || [])],
        isLoading: false
      };

    case appTypes.UPLOAD_RESUME_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case appTypes.APPLY_JOB_SUCCESS:
      return { ...state, isLoading: false };

    case appTypes.APPLY_JOB_FAILURE:
      return { ...state, isLoading: false, error: payload };

      case appTypes.PUBLISH_JOB_REQUEST:
  return { ...state, loading: true };

case appTypes.PUBLISH_JOB_SUCCESS:
  return {
    ...state,
    loading: false,
    jobs: state.jobs.map((job) =>
      job._id === payload._id ? payload : job
    ),
  };

case appTypes.PUBLISH_JOB_FAILURE:
  return { ...state, loading: false, error: payload };

  
    default:
      return state;
  }
};

