import {
  FETCH_APPOINTMENT_BLOCK_WITH_TIME_SLOTS,
  ADD_APPOINTMENT_BLOCK_WITH_TIME_SLOT,
  UPDATE_APPOINTMENT_BLOCK_WITH_TIME_SLOT,
  DELETE_APPOINTMENT_BLOCK_WITH_TIME_SLOT,
} from "../constants/action-types";

export function fetchAppointmentBlockWithTimeSlot(payload) {
  return { type: FETCH_APPOINTMENT_BLOCK_WITH_TIME_SLOTS, payload };
}

export function addAppointmentBlockWithTimeSlot(payload) {
  return { type: ADD_APPOINTMENT_BLOCK_WITH_TIME_SLOT, payload };
}

export function updateAppointmentBlockWithTimeSlot(payload) {
  return { type: UPDATE_APPOINTMENT_BLOCK_WITH_TIME_SLOT, payload };
}

export function deleteAppointmentBlockWithTimeSlot(payload) {
  return { type: DELETE_APPOINTMENT_BLOCK_WITH_TIME_SLOT, payload };
}
