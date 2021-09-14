import {
    LOADING_CONCEPTS,
    CONCEPTS_LOADED,
    LOADING_PATIENT,
    PATIENT_LOADED,
    ENCOUNTER_TYPES_LOADING,
    ENCOUNTER_TYPES_LOADED
} from "../constants/action-types";

import {
    Concept,
    Encounter,
    Patient,
    VitalSigns
} from '../services/data/'

export const loadPatientAndConcepts = (patientId) => async (dispatch, getState) => {
    //We need to first dispatch the loading action so that we can notify user.
    dispatch({
        type: LOADING_CONCEPTS
    })
    dispatch({
        type: LOADING_PATIENT
    })
    dispatch({
        type: ENCOUNTER_TYPES_LOADING
    })

    let symptom = await Concept.getSymptoms();
    let diagnosis = await Concept.getDiagnosis()
    let drug = await Concept.getDrugs()
    let investigation = await Concept.getInvestigations()
    let procedure = await Concept.getProcedures()
    let allConcepts = await Concept.getAllConcepts()

    let vitals = await Concept.getVitals();

    dispatch({
        type: CONCEPTS_LOADED,
        payload: {
            symptom,
            diagnosis,
            drug,
            investigation,
            procedure,
            vitals,
            allConcepts
        }
    })


    let encounterTypes = await Encounter.getEncounterTypes();
    dispatch({
        type: ENCOUNTER_TYPES_LOADED,
        payload: {
            encounterTypes
        }
    })

    let patientDetail = await Patient.getPatientWithId(patientId);

    console.log("patient detail is ",patientDetail, encounterTypes)

    dispatch({
        type: PATIENT_LOADED,
        payload: patientDetail
    })
}

export const savePatientDiagnosys = (details) => async (dispatch, getState) => {
    /*dispatch({
        type: SAVING_PATIENT_,
        payload: patientDetail
    })*/
    console.log("trying to save patient Diagnosys here",details)
}