const SER_END = "/api/v1";
const MBP_END = "http://192.168.50.192:3000/api/v1";

export const API_END =
  process.env.NODE_ENV === "production" ? SER_END : MBP_END;
// * auth
export const LOGIN_URL = `${API_END}/user/login`;
export const REGISTER_URL = `${API_END}/register`;
// * caregiver
export const CAREGIVER_URL = `${API_END}/caregiver`;
export const CAREGIVERBYUSER_URL = `${CAREGIVER_URL}/user`;
// * patient
export const PATIENT_URL = `${API_END}/patient`;
export const PATIENTBYCAREGIVER_URL = `${PATIENT_URL}/caregiver`;
export const PATIENTBYUSER_URL = `${PATIENT_URL}/user`;
// * record
export const RECORD_URL = `${API_END}/record`;
export const RECORDBYAUTHOR_URL = `${RECORD_URL}/author`;
export const RECORDBYPATIENT_URL = `${RECORD_URL}/patient`;
// * local storage keys
export const ACCESS_STORAGE_KEY = "user";
export const REFRESH_TOKEN_KEY = "refreshToken";
