import axios from 'axios';
import storage from 'src/utils/storageUtils';

/* =========================
   AXIOS INSTANCE
========================= */

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL || '',
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

client.interceptors.request.use(
  (config) => {
    const token = storage.get('TOKEN');
    const tenantHash = storage.get('TENANT_HASH');
    const isFormData = config.data instanceof FormData;

    config.headers = {
      ...config.headers,
      ...(isFormData ? {} : { 'Content-Type': 'application/json;charset=utf-8' }),
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (tenantHash) {
      config.headers.Tenant = tenantHash;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 403) {
      storage.del('TOKEN');
      storage.del('ROLE');
      storage.del('TENANT_HASH');
    }

    return Promise.reject(error?.response?.data || error);
  }
);

/* =========================
   BASE API FUNCTION
========================= */

export default function api(
  path,
  payload = {},
  method = 'get',
  isFormData = false,
  onUploadProgress,
  responseType = 'json',
  params = {}
) {
  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    path = `${path}?${queryString}`;
  }

  return client
    .request({
      method,
      url: path,
      data: payload,
      responseType,
      ...(onUploadProgress && { onUploadProgress }),
    })
    .then((response) => response.data);
}

/* =========================
   POST TRAVEL DATA
========================= */

export function postNurseTravel(travelData) {
  return api('/api/v1/nurses/travel', travelData, 'post');
}

/* =========================
   POST AVAILABILITY DATA ✅
========================= */

export function postNurseAvailability(availabilityData) {
  return api('/api/v1/nurses/availability', availabilityData, 'post');
}
