import {
  ADD_APPOINTMENT_BLOCK_WITH_TIME_SLOT,
  DELETE_APPOINTMENT_BLOCK_WITH_TIME_SLOT,
  FETCH_APPOINTMENT_BLOCK_WITH_TIME_SLOTS,
  UPDATE_APPOINTMENT_BLOCK_WITH_TIME_SLOT,
} from "../constants/action-types";

const initialState = {
  appointmentBlockWithTimeSlot: [],
};

function locationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPOINTMENT_BLOCK_WITH_TIME_SLOTS:
      state.appointmentBlockWithTimeSlot = action.payload;
      return state;
    case ADD_APPOINTMENT_BLOCK_WITH_TIME_SLOT:
      state.appointmentBlockWithTimeSlot = [
        ...state.appointmentBlockWithTimeSlot,
        action.payload,
      ];
      return state;
    case UPDATE_APPOINTMENT_BLOCK_WITH_TIME_SLOT:
      state.appointmentBlockWithTimeSlot = state.appointmentBlockWithTimeSlot.map(
        (appointment) =>
          appointment.id === action.payload.id ? action.payload : appointment
      );
      return state;
    case DELETE_APPOINTMENT_BLOCK_WITH_TIME_SLOT:
      state.appointmentBlockWithTimeSlot = state.appointmentBlockWithTimeSlot.filter(
        (appointment) => appointment.id !== action.payload
      );
      return state;
    default:
      return state;
  }
}

export default locationReducer;
