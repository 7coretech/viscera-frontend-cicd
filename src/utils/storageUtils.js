export const storageKey = {
  TOKEN: 'token',
  DOCTORNAME: 'doctorname',
  CREATE_SEQUENCE_SOURCE: 'createSequenceSource',
  CREATE_TASK_SOURCE: 'createTaskSource',
  ENROLL_FORM_SOURCE: 'enrollFormSource',
  REFERRAL_ROUTE: 'referralRouter',
  TENANT_HASH: 'tenantHash',
  GLOBAL_SEARCH: 'globalSearch',
  IsPermanentOpen: 'isPermanentOpen',
  CLINIC_ID: 'clinicId',
  ROLE:'role'
};

const storage = {
  set: (key, data) => {
    return localStorage.setItem(storageKey[key], data);
  },
  get: (key) => {
    return localStorage.getItem(storageKey[key]);
  },
  del: (key) => {
    return localStorage.removeItem(storageKey[key]);
  },
};
export default storage;

export const getBaseURL = () => {
  // return `https://${localStorage.getItem(mainConnector)}` || 'https://tr-testing.succede.com';
  return `https://staging-api.superreach.com`;
};
