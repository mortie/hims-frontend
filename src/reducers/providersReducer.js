import { FETCH_PROVIDERS } from "../constants/action-types";

const initialState = {
  providers: null
};

function providersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROVIDERS:
      state.providers = action.payload;
      return state;
    default:
      return state;
  }
}

export default providersReducer;
