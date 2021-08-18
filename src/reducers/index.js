import { combineReducers } from "redux";
import avatar from "./avatarReducer";
import providers from "./providersReducer";
import locations from "./locationReducer";
import services from "./serviceReducer";
import visits from "./visitsReducer"
import concepts from "./conceptsReducer"
import patient from "./patientReducer"
import appointmentBlockWithTimeSlots from "./appointmentBlockWithTimeSlotReducer";
import encounters from './encountersReducer'

export default combineReducers({
  avatar,
  providers,
  locations,
  services,
  appointmentBlockWithTimeSlots,
  visits,
  concepts,
  patient,
  encounters
});
