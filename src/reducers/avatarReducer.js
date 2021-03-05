import { FETCH_AVATAR, REMVOE_AVATAR } from "../constants/action-types";

const initialState = {
  avatar: null,
};

function avatarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AVATAR:
      state.avatar = action.payload;
      return state;
    case REMVOE_AVATAR:
      state.avatar = null;
      return state;
    default:
      return state;
  }
}

export default avatarReducer;
