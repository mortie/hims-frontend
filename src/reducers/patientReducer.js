import {
    PATIENT_LOADED,
    LOADING_PATIENT
} from "../constants/action-types";

const initialState = {
    loadingPatient: false,
    patient: null
};

function patientReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_PATIENT:
            return {
                ...state,
                loadingPatient: true,
                    patient: null
            };
            break;
        case PATIENT_LOADED:
            return {
                ...state,
                loadingPatient: false,
                    patient: action.payload
            }
            break;
        default:
            return state;
    }
}

export default patientReducer;