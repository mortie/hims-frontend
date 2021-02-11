import { ADD_AVATAR, REMVOE_AVATAR } from "../constants/action-types";

export function addAvatar(payload) {
  return { type: ADD_AVATAR, payload };
}

export function removeAvatar() {
  return { type: REMVOE_AVATAR };
}
