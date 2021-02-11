import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { avatarReducer } from "../reducers";

const store = createStore(avatarReducer, applyMiddleware(logger));

export default store;
