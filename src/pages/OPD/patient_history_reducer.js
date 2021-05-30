import { useEffect, useReducer } from 'react'
import { IMMUNIZATION_DATA } from './patient_history_types';

const INITIAL_STATE = {
    immuniation_data = {}
}

const reducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case IMMUNIZATION_DATA: {
            return {
                ...state,
                immuniation_data: action.payload,
            }
        }
        default: {
            return state
        }
    }
}