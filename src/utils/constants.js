export const USER_TOKEN = "authenticatedUser";
export const REMEMBER_ME = "REMEMBER_ME";
export const JSESSIONID = "JSESSIONID";
export const SESSION_TIME_OUT = 1 / 48;
export const BASE_URL =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:8080/openmrs-new/ws/rest/v1"
  //   : "https://ln3.hispindia.org/openmrs/ws/rest/v1";
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs/ws/rest/v1";

// Concepts
export const HEIGHT = "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const WEIGHT = "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const BMI = "d7d7dc30-13d5-4661-942e-f69fd1701079";
export const SYSTOLIC = "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const DIASTOLIC = "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
