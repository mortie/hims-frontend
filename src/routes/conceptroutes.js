import {
    ManageConceptClass,
    ManageConceptDrugs,
    ManageConceptSource,
    ViewConceptDictionary,
  } from "../pages/SystemAdministration/ConceptManagement/components";
  
  /**
   * list of available routes for the entire application.
   */
  export const conceptRoutes = [
    {
      path: "/concept_class",
      title: "Manage Concept Class",
      roles: ["*"],
      component: ManageConceptClass,
      layout: "/app",
    },
    {
        path: "/concept_drugs",
        title: "Manage Concept Drugs",
        roles: ["*"],
        visibleOnSidebar: false,
        icon: "",
        component: ManageConceptDrugs,
        layout: "/app",
      },
      {
        path: "/concept_source",
        title: "Manage Concept Source",
        roles: ["*"],
        visibleOnSidebar: false,
        icon: "",
        component: ManageConceptSource,
        layout: "/app",
      },
      {
        path: "/view_concept",
        title: "View Concept Dictionary",
        roles: ["*"],
        visibleOnSidebar: false,
        icon: "",
        component: ViewConceptDictionary,
        layout: "/app",
      },
  ];
  