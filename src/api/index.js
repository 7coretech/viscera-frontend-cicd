import axios from 'axios';
import storage from 'src/utils/storageUtils';

/* =========================
   AXIOS INSTANCE
========================= */

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

if (!BASE_URL) {
  console.error('❌ REACT_APP_BASE_API_URL is missing');
}

const client = axios.create({
  baseURL: BASE_URL,
  validateStatus: (status) => status >= 200 && status < 400,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

client.interceptors.request.use(
  (config) => {
    const token = storage.get('TOKEN');
    const tenantHash = storage.get('TENANT_HASH');
    const isFormData = config.data instanceof FormData;

    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (tenantHash) {
      config.headers['Tenant-Hash'] = tenantHash;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR ✅
========================= */

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response || error);
    return Promise.reject(error);
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
  return client
    .request({
      url: path,
      method,
      responseType,
      ...(method === 'get'
        ? { params: payload }
        : { data: payload }),
      ...(onUploadProgress && { onUploadProgress }),
    })
    .then((response) => response.data);
}

/* =========================
   EXTRA APIs
========================= */

export const postNurseTravel = (travelData) =>
  api('/api/v1/nurses/travel', travelData, 'post');

export const postNurseAvailability = (availabilityData) =>
  api('/api/v1/nurses/availability', availabilityData, 'post');
