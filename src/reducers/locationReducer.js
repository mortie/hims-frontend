import {
  LOADING_LOCATIONS,
  LOCATIONS_LOADED
} from "../constants/action-types";

const initialState = {
  locations: null,
  loadingLocations: false,
};

function locationReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_LOCATIONS:
      return {
        ...state,
        locations: null,
        loadingLocations: true
      };
      break;
    case LOCATIONS_LOADED:
      return {
        ...state,
        loadingLocations: false,
        locations: action.payload
      }
      break;
    default:
      return state;
  }
}

export default locationReducer;