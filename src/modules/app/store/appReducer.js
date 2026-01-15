import * as appTypes from './appTypes';

const initialState = {
  isLoading: false,
  error: null,
  job: [],
  jobs: [],
  alljobs: [],
  savejobs: [],
  myresumes: [],
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    /* ===================== JOB LIST ===================== */

    case appTypes.FETCH_JOBS_REQUEST:
    case appTypes.FETCH_ALLJOBS_REQUEST:
    case appTypes.FETCH_SAVE_JOBS_REQUEST:
    case appTypes.FETCH_MY_RESUMES_REQUEST:
    case appTypes.SAVE_JOB_REQUEST:
    case appTypes.UNSAVE_JOB_REQUEST:
    case appTypes.CREATE_JOB_REQUEST:
    case appTypes.PUBLISH_JOB_REQUEST:
      return { ...state, isLoading: true, error: null };

    case appTypes.FETCH_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: payload.payload,
      };

  case appTypes.FETCH_ALLJOBS_SUCCESS:
  return {
    ...state,
    isLoading: false,
    alljobs: (payload.payload || []).map((job) => ({
      ...job,
      id: job.id,          // ✅ UUID from backend
      saved: false,
      applied: false,
    })),
  };


    case appTypes.FETCH_JOBS_FAILURE:
    case appTypes.FETCH_ALLJOBS_FAILURE:
    case appTypes.FETCH_SAVE_JOBS_FAILURE:
    case appTypes.FETCH_MY_RESUMES_FAILURE:
    case appTypes.SAVE_JOB_FAILURE:
    case appTypes.UNSAVE_JOB_FAILURE:
    case appTypes.CREATE_JOB_FAILURE:
    case appTypes.APPLY_JOB_FAILURE:
    case appTypes.PUBLISH_JOB_FAILURE:
    case appTypes.UPLOAD_RESUME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    /* ===================== CREATE / PUBLISH ===================== */

    case appTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        job: [...state.job, payload.payload],
      };

    case appTypes.PUBLISH_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: state.jobs.map((job) =>
          job.id === payload.payload.id ? payload.payload : job
        ),
      };

    /* ===================== SAVE / UNSAVE JOB ===================== */
case appTypes.SAVE_JOB_SUCCESS: {
  const savedJobId = payload.payload?.jobId || payload.payload?._doc?.jobId;
  const alljobs = state.alljobs.map((job) =>
    (job._id === savedJobId || job.id === savedJobId) ? { ...job, saved: true } : job
  );
  const jobObj = state.alljobs.find((j) => j._id === savedJobId || j.id === savedJobId);
  const savejobs = jobObj
    ? [
        ...state.savejobs.filter((j) => (j._id || j.id) !== savedJobId),
        { ...jobObj, saved: true, id: jobObj._id || jobObj.id },
      ]
    : state.savejobs;
  return { ...state, isLoading: false, alljobs, savejobs };
}


   case appTypes.UNSAVE_JOB_SUCCESS: {
  const jobId = payload.payload?.jobId;

  return {
    ...state,
    isLoading: false,
    alljobs: state.alljobs.map((job) =>
      job.id === jobId
        ? { ...job, saved: false }
        : job
    ),
  };
}



    /* ===================== SAVED JOBS ===================== */

    case appTypes.FETCH_SAVE_JOBS_SUCCESS:
  return {
    ...state,
    isLoading: false,
    savejobs: (payload.payload || []).map((item) => {
      const jobObj = item?.jobId || item;
      return {
        ...jobObj,
        id: jobObj?._id || jobObj?.id,
        saved: true,
      };
    }),
  };

    /* ===================== RESUMES ===================== */

    case appTypes.FETCH_MY_RESUMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myresumes: payload.payload,
      };

    case appTypes.UPLOAD_RESUME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myresumes: [...state.myresumes, ...(payload.payload || [])],
      };

    /* ===================== APPLY JOB ===================== */

    case appTypes.APPLY_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alljobs: state.alljobs.map((job) =>
          (job._id === payload.payload.jobId || job.id === payload.payload.jobId)
            ? { ...job, applied: true }
            : job
        ),
      };

    /* ===================== DEFAULT ===================== */

    default:
      return state;
  }
};