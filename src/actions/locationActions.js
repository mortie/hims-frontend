import { FETCH_LOCATIONS } from "../constants/action-types";

export function addLocations(payload) {
  return { type: FETCH_LOCATIONS, payload };
}
