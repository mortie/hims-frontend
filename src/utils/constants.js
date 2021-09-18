export const USER_TOKEN = "authenticatedUser";
export const REMEMBER_ME = "REMEMBER_ME";
export const JSESSIONID = "JSESSIONID";
export const SESSION_TIME_OUT = 1 / 48;
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/openmrs/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs/ws/rest/v1";

// Concepts
export const HEIGHT = "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const WEIGHT = "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const BMI = "d7d7dc30-13d5-4661-942e-f69fd1701079";
export const SYSTOLIC = "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const DIASTOLIC = "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

export const CONCEPT_SYMPTOPM = "Symptom"
export const CONCEPT_DIAGNOSIS = "Diagnosis"
export const CONCEPT_PROCEDURE = "Procedure"
export const CONCEPT_INVESTIGATION = "Test"
export const CONCEPT_DRUG = "Drug"
export const CONCEPT_VITAL="Vital"

export const ENCOUNTER_TYPE_VITALS = "Vitals"
export const ENCOUNTER_TYPE_VISIT_NOTE = "Visit Note"
export const ENCOUNTER_TYPE_VISIT_INFO = "Visit Info"
export const ENCOUNTER_TYPE_PATIENT_HISTORY = "Patient History"
export const ENCOUNTER_TYPE_DISCHARGE = "Discharge"
export const ENCOUNTER_TYPE_CHECK_IN = "Check In"

export const ANSWER_YES = "Yes"