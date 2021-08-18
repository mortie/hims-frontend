import {
  LOADING_VISITS,
  VISITS_LOADED
} from "../constants/action-types";

const initialState = {
  visits: null,
  loadingVisits: false,
};

function visitsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_VISITS:
      return {
        ...state,
        visits: null,
        loadingVisits: true
      };
      break;
    case VISITS_LOADED:
      return {
        ...state,
        loadingVisits: false,
        visits: action.payload
      }
      break;
    default:
      return state;
  }
}

export default visitsReducer;