export const USER_TOKEN = "authenticatedUser";
export const REMEMBER_ME = "REMEMBER_ME";
export const JSESSIONID = "JSESSIONID";
export const SESSION_TIME_OUT = 1 / 48;
export const MPI_URL =
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs_mpi/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs_mpi/ws/rest/v1";
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs/ws/rest/v1";

/*Add Adress Hierarcy path provided by new api*/
export const ADRESSBASE_URL_API=
process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs/ws/hisp/rest"
    : "https://ln3.hispindia.org/openmrs/ws/hisp/rest";

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
export const CONCEPT_OPD_VISIT_OUTCOME_UUID = "2da0546f-c201-4885-8a99-b09317894adc"

export const ENCOUNTER_TYPE_VITALS = "Vitals"
export const ENCOUNTER_TYPE_VISIT_NOTE = "Visit Note"
export const ENCOUNTER_TYPE_VISIT_INFO = "Visit Info"
export const ENCOUNTER_TYPE_PATIENT_HISTORY = "Patient History"
export const ENCOUNTER_TYPE_DISCHARGE = "Discharge"
export const ENCOUNTER_TYPE_CHECK_IN = "Check In"


export const VISIT_OUTCOME_CURED = "Cured"
export const VISIT_OUTCOME_REVIEWED = "Reviewed"
export const VISIT_OUTCOME_DIED = "Died"
export const VISIT_OUTCOME_FOLLOW_UP = "Follow Up"
export const VISIT_OUTCOME_ADMIT = "Admit"

export const LOCATION_OUTPATIENT_TAG = "OPD Location"
export const LOCATION_INPATIENT_TAG = "IPD Location"

export const ANSWER_YES = "Yes"

export const HOSPITAL_NAME =
  process.env.NODE_ENV === "development"
    ? "acd05df0-e499-4613-ab8f-818c5470c79e"
    : "acd05df0-e499-4613-ab8f-818c5470c79e";
export const HOSPITAL_DISTRICT =
  process.env.NODE_ENV === "development"
    ? "97941f41-7377-4456-b999-a424ec904796"
    : "64016214-2231-4cf2-9ae1-1c18d4dc1ec0";
export const PERSON_UPDATED = "75f95cc0-aff4-4025-9f69-27029d186e95";
export const PATIENT_UPDATED = "7317240c-13c9-4dc0-9c8c-7916d568fc47";
export const MPI_ID = "4ea2ceb4-2edf-454f-af76-ef7e8d777901";
export const District_Dropdown= "Shimla";
export const REGISTRATION_HOSPITAL_NAME = "Deendyal Upadhyay Zonal Hospital";