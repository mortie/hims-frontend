import {
  Home,
  PatientSearch,
  Triage,
  OPD,
  IPD,
  Pharmacy,
  Radiology,
  Laboratory,
  Billing,
  UserProfile,
  ProviderScheduling,
  PatientRegistration,
  OnlinePatients,
  SystemAdmin,
  PatientEdit,
} from "../pages";

/**
 * list of available routes for the entire application.
 */
export const appRoutes = [
  {
    path: "/home",
    title: "Home",
    roles: ["*"],
    visibleOnSidebar: true,
    icon: "fa fa-clinic-medical",
    component: Home,
    layout: "/app",
  },
  {
    path: "/patient-search",
    title: "Patient Search",
    roles: [
      "System Developer",
      "Organizational: Registration clerk",
      "Application: Registers Patients",
      "Application: Schedules appointments",
      "Application: Sees appointment schedule",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-user-plus",
    component: PatientSearch,
    layout: "/app",
  },
  {
    path: "/online-appointments",
    title: "Online Appointments",
    roles: [
      "System Developer",
      "Organizational: Registration clerk",
      "Application: Registers Patients",
      "Application: Schedules appointments",
      "Application: Sees appointment schedule",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-calendar-check",
    component: OnlinePatients,
    layout: "/app",
  },
  {
    path: "/patient-registration",
    title: "Patient Registration",
    roles: [
      "System Developer",
      "Organizational: Registration clerk",
      "Application: Registers Patients",
      "Application: Schedules appointments",
      "Application: Sees appointment schedule",
    ],
    visibleOnSidebar: false,
    icon: "fa fa-user-plus",
    component: PatientRegistration,
    layout: "/app",
  },
  {
    path: "/edit-patient/:id",
    title: "Edit Patient",
    roles: [
      "System Developer",
      "Organizational: Registration clerk",
      "Application: Registers Patients",
      "Application: Schedules appointments",
      "Application: Sees appointment schedule",
    ],
    visibleOnSidebar: false,
    icon: "fa fa-user-plus",
    component: PatientEdit,
    layout: "/app",
  },
  {
    path: "/triage",
    title: "Triage",
    roles: [
      "System Developer",
      "Organizational: Doctor",
      "Application: Enter ADT events",
      "Application: Record allergies",
      "Application: Requests appointments",
      "Application: Sees appointment schedule",
      "Application: Uses patient summary",
      "Application: Writes clinical notes",
    ],
    visibleOnSidebar: true,
    icon: "fas fa-heartbeat",
    component: Triage,
    layout: "/app",
  },
  {
    path: "/opd",
    title: "OPD",
    roles: [
      "System Developer",
      "Organizational: Doctor",
      "Application: Enter ADT events",
      "Application: Record allergies",
      "Application: Requests appointments",
      "Application: Sees appointment schedule",
      "Application: Uses patient summary",
      "Application: Writes clinical notes",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-user-md",
    component: OPD,
    layout: "/app",
  },
  {
    path: "/ipd",
    title: "IPD",
    roles: [
      "System Developer",
      "Organizational: Nurse",
      "Application: Enter ADT events",
      "Application: Enter vitals",
      "Application: Record allergies",
      "Application: Requests appointments",
      "Application: Sees appointment schedule",
      "Application: Uses patient summary",
      "Application: Uses capture vitals app",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-procedures",
    component: IPD,
    layout: "/app",
  },
  {
    path: "/pharmacy",
    title: "Pharmacy",
    roles: ["System Developer", "Organizational: Pharmacy"],
    visibleOnSidebar: true,
    icon: "fa fa-prescription-bottle-alt",
    component: Pharmacy,
    layout: "/app",
  },
  {
    path: "/billing",
    title: "Billing",
    roles: [
      "System Developer",
      "Application: Billing Administrator",
      "Application: Billing Clerk",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-receipt",
    component: Billing,
    layout: "/app",
  },
  {
    path: "/laboratory",
    title: "Laboratory",
    roles: [
      "System Developer",
      "Organizational: Laboratory Administrator",
      "Application: Laboratory Technician",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-vials",
    component: Laboratory,
    layout: "/app",
  },
  {
    path: "/radiology",
    title: "Radiology",
    roles: [
      "System Developer",
      "Organizational: Radiology Administrator",
      "Application: Radiology Technician",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-x-ray",
    component: Radiology,
    layout: "/app",
  },
  {
    path: "/user-profile",
    title: "User Profile",
    roles: ["*"],
    visibleOnSidebar: false,
    icon: "",
    component: UserProfile,
    layout: "/app",
  },
  {
    path: "/schedule-provider",
    title: "Provider Schedule",
    roles: ["*"],
    visibleOnSidebar: true,
    icon: "fa fa-calendar-alt",
    component: ProviderScheduling,
    layout: "/app",
  },
  {
    path: "/system-administration",
    title: "System Administration",
    roles: [
      "System Developer",
      "Organizational: Registration clerk",
      "Application: Registers Patients",
      "Application: Schedules appointments",
      "Application: Sees appointment schedule",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-user",
    component: SystemAdmin,
    layout: "/app",
  },
];
