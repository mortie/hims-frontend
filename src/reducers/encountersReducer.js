import {
    ENCOUNTER_TYPES_LOADING,
    ENCOUNTER_TYPES_LOADED
} from "../constants/action-types";

const initialState = {
    loadingEncounters:false,
    encounterTypes: null
};

function encounterReducer(state = initialState, action) {
    switch (action.type) {
        case ENCOUNTER_TYPES_LOADING:
            return {
                ...state,
                loadingConcepts: true,
                    encounterTypes: null
            };
            break;
        case ENCOUNTER_TYPES_LOADED:
            return {
                ...state,
                loadingConcepts: false,
                encounterTypes: action.payload.encounterTypes
            }
            break;
        default:
            return state;
    }
}

export default encounterReducer;