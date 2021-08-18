import {
  LOADING_LOCATIONS,
  LOCATIONS_LOADED,
  FETCH_LOCATIONS
} from "../constants/action-types";

import {
  Location
} from '../services/data/'



//TO DELETE
export function addLocations(payload) {
  return {
    type: FETCH_LOCATIONS,
    payload
  };
}

export const getAllLocationsAction = () => async (dispatch, getState) => {
  //We need to first dispatch the loading action so that we can notify user.
  dispatch({
    type: LOADING_LOCATIONS
  })

  //get the locations
  let allLocations = await Location.getAll({});

  //map the locations with their uuids
  allLocations.forEach(location=>{
    allLocations[location.uuid]=location
  })

  dispatch({
    type: LOCATIONS_LOADED,
    payload: allLocations
  })
}