import {
    PATIENT_HISOTRY_SAVED,
    SAVING_PATIENT_HISTORY
  } from "../constants/action-types";
  
  const initialState = {
    payload: null,
    savingPatientHistory: false,
  };
  
  function locationReducer(state = initialState, action) {
    switch (action.type) {
      case SAVING_PATIENT_HISTORY:
        return {
          ...state,
          payload: action.payload,
          savingPatientHistory: true
        };
        break;
      case PATIENT_HISOTRY_SAVED:
        return {
          ...state,
          payload: action.payload,
          savingPatientHistory: false
        }
        break;
      default:
        return state;
    }
  }
  
  export default locationReducer;