import { combineReducers } from "redux";
import avatar from "./avatarReducer";
import providers from "./providersReducer";
import locations from "./locationReducer";
import services from "./serviceReducer";
import appointmentBlockWithTimeSlots from "./appointmentBlockWithTimeSlotReducer";

export default combineReducers({
  avatar,
  providers,
  locations,
  services,
  appointmentBlockWithTimeSlots,
});
