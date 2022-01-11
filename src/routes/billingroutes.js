import {
    BillableService,
    ManageLocation,
    ManageAmbulance,
    ManageCompany,
    ManageTender,
  } from "../pages/SystemAdministration/BillingService/components";
  
  /**
   * list of available routes for the entire application.
   */
  export const billingRoutes = [
    {
      path: "/billable_service",
      title: "Manage Billable Service",
      roles: ["*"],
      component: BillableService,
      layout: "/app",
    },
    {
        path: "/manage_location",
        title: "Manage Billing Location",
        roles: ["*"],
        visibleOnSidebar: false,
        icon: "",
        component: ManageLocation,
        layout: "/app",
      },
      {
        path: "/manage_ambulance",
        title: "Manage Ambulance",
        roles: ["*"],
        visibleOnSidebar: false,
        icon: "",
        component: ManageAmbulance,
        layout: "/app",
      },
      {
        path: "/manage_company",
        title: "Manage Company",
        roles: ["*"],
        visibleOnSidebar: false,
        icon: "",
        component: ManageCompany,
        layout: "/app",
      },
      {
        path: "/manage_tender",
        title: "Manage Tender",
        roles: ["*"],
        visibleOnSidebar: false,
        icon: "",
        component: ManageTender,
        layout: "/app",
      },
      
  ];
  