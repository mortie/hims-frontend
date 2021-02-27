import { ADD_SERVICES } from "../constants/action-types";

export function addServices(payload) {
  return { type: ADD_SERVICES, payload };
}
