import {
    CONCEPTS_LOADED,
    LOADING_CONCEPTS
} from "../constants/action-types";

const initialState = {
    loadingConcepts: false,
    symptom: null,
    diagnosis: null,
    procedure: null,
    investigation: null,
    drug: null,
    vitals: null
};

function conceptsReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_CONCEPTS:
            return {
                ...state,
                loadingConcepts: true,
                symptom: null,
                diagnosis: null,
                procedure: null,
                investigation: null,
                drug: null,
                vitals: null,
            };
            break;
        case CONCEPTS_LOADED:
            return {
                ...state,
                loadingConcepts: false,
                symptom: action.payload.symptom,
                diagnosis: action.payload.diagnosis,
                procedure: action.payload.procedure,
                investigation: action.payload.investigation,
                //drug: action.payload.finding,
                vitals: action.payload.vitals,
                allConcepts: action.payload.allConcepts
            }
            break;
        default:
            return state;
    }
}

export default conceptsReducer;