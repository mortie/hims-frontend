import { ADD_PROVIDERS } from "../constants/action-types";

export function addProviders(payload) {
  return { type: ADD_PROVIDERS, payload };
}
