import { FETCH_SERVICES } from "../constants/action-types";

export function addServices(payload) {
  return { type: FETCH_SERVICES, payload };
}
