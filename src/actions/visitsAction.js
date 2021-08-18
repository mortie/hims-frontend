import {
    VISITS_LOADED,
    LOADING_VISITS
} from "../constants/action-types";

import {
    Visit
} from '../services/data/'
import { Concept } from "../services/data/Concept";


export const getAllVisitsAction = () => async (dispatch, getState) => {
    //We need to first dispatch the loading action so that we can notify user.
    dispatch({
        type: LOADING_VISITS
    })

    let visits = await Visit.getAll({});

    dispatch({
        type: VISITS_LOADED,
        payload: visits
    })
}