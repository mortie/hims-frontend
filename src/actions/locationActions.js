import { ADD_LOCATIONS } from "../constants/action-types";

export function addLocations(payload) {
  return { type: ADD_LOCATIONS, payload };
}
