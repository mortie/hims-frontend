import { FETCH_AVATAR, REMVOE_AVATAR } from "../constants/action-types";

export function addAvatar(payload) {
  return { type: FETCH_AVATAR, payload };
}

export function removeAvatar() {
  return { type: REMVOE_AVATAR };
}
