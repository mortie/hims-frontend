import { ADD_LOCATIONS } from "../constants/action-types";

const initialState = {
  locations: null,
};

function locationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LOCATIONS:
      state.locations = action.payload;
      return state;
    default:
      return state;
  }
}

export default locationReducer;
