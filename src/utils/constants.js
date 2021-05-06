export const USER_TOKEN = "authenticatedUser";
export const REMEMBER_ME = "REMEMBER_ME";
export const JSESSIONID = "JSESSIONID";
export const SESSION_TIME_OUT = 1 / 48;
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs/ws/rest/v1";
