import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import reducer from "../reducers";
import thunk from 'redux-thunk'

export const store = createStore(reducer, applyMiddleware(logger, thunk));
