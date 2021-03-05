import { FETCH_SERVICES } from "../constants/action-types";

const initialState = {
  services: null
};

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICES:
      state.services = action.payload;
      return state;
    default:
      return state;
  }
}

export default serviceReducer;
