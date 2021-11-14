import {
    LOADING_CONCEPTS,
    CONCEPTS_LOADED,
    LOADING_PATIENT,
    PATIENT_LOADED,
    ENCOUNTER_TYPES_LOADING,
    ENCOUNTER_TYPES_LOADED,
    SAVING_PATIENT_HISTORY
} from "../constants/action-types";

import {
    Concept,
    Encounter,
    Patient,
    PatientHistory,
    VitalSigns
} from '../services/data/'
import { ANSWER_YES, CONCEPT_OPD_VISIT_OUTCOME_UUID, VISIT_OUTCOME_ADMIT, VISIT_OUTCOME_DIED, VISIT_OUTCOME_FOLLOW_UP } from "../utils/constants";

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
    let visitOutcomes = await Concept.getVisitOutcomes();
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
            visitOutcomes,
            allConcepts
        }
    })


    let encounterTypes = await Encounter.getPatientHistoryEncounterType();
    dispatch({
        type: ENCOUNTER_TYPES_LOADED,
        payload: {
            encounterTypes
        }
    })

    let patientDetail = await Patient.getPatientWithId(patientId);

    console.log("patient detail is ", patientDetail, encounterTypes)

    dispatch({
        type: PATIENT_LOADED,
        payload: patientDetail
    })
}

const addAnswer = (arrayToAddTo, selectedConcepts) => {
    selectedConcepts.forEach(theConcept => {
        if (theConcept.answers.length > 0) {
            let yesUuid = null
            theConcept.answers.forEach(answer => {
                if (answer.display === ANSWER_YES) {
                    yesUuid = answer.uuid
                    return;
                }
            })

            if (yesUuid !== null) {
                arrayToAddTo.push(
                    {
                        concept: theConcept.uuid,
                        value: yesUuid
                    }
                )
            }
        }
    })
}

export const savePatientDiagnosys = (details) => async (dispatch, getState) => {


    let patientHistoryEncounterType = await Encounter.getPatientHistoryEncounterType();
    let payload = {
        patient: details.visit.id,
        encounterDatetime: (new Date()).toISOString(),
        encounterType: patientHistoryEncounterType.uuid,
        visit: details.visit.visit,
        obs: []
    }

    addAnswer(payload.obs, details.selectedDiagnosis)

    addAnswer(payload.obs, details.selectedSymptoms)
    addAnswer(payload.obs, details.selectedInvestigation)
    addAnswer(payload.obs, details.selectedProcedures)

    payload.obs.push({ concept: CONCEPT_OPD_VISIT_OUTCOME_UUID, value: details.visitOutcomeDetails.visitOutcome.uuid })
    if (details.visitOutcomeDetails.visitOutcome.display === VISIT_OUTCOME_DIED ||
        details.visitOutcomeDetails.visitOutcome.display === VISIT_OUTCOME_FOLLOW_UP) {
        payload.obs.push({ concept: details.visitOutcomeDetails.visitOutcome.uuid, value: details.visitOutcomeDetails.selectedDate })
    }
    if(details.visitOutcomeDetails.visitOutcome.display === VISIT_OUTCOME_ADMIT){
        payload.obs.push({ concept: details.visitOutcomeDetails.visitOutcome.uuid, value: details.visitOutcomeDetails.selectedLocation })
    }


    dispatch({
        type: SAVING_PATIENT_HISTORY,
        payload: payload
    })

    let response = await PatientHistory.savePatientHistory(payload)

    console.log("response after saving details is ", response)
}