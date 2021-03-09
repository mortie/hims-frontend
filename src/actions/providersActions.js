import { FETCH_PROVIDERS } from "../constants/action-types";

export function addProviders(payload) {
  return { type: FETCH_PROVIDERS, payload };
}
