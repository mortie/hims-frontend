import { CONCEPT_DIAGNOSIS, CONCEPT_DRUG, CONCEPT_INVESTIGATION, CONCEPT_PROCEDURE, CONCEPT_SYMPTOPM, CONCEPT_VITAL, CONCEPT_TEST, CONCEPT_OPD_VISIT_OUTCOME_UUID } from '../../utils/constants';
import {
    getAPI,
    remapArrayWithField,
} from '../index'



export class Concept {
    static allConcepts = [];
    static conceptsByClass = {};

    static initConceptClasses = async () => {
        const conceptsUrl = '/concept?v=custom:(uuid,display,answers,datatype,conceptClass:(uuid,display),setMembers:(uuid))'

        let concepts = (await getAPI(conceptsUrl)).data.results

        concepts.forEach(concept => {
            concepts[concept.uuid] = concept
            
            if (!this.conceptsByClass[concept.conceptClass.display]) {
                this.conceptsByClass[concept.conceptClass.display] = []
                
            }
            this.conceptsByClass[concept.conceptClass.display].push(concept)
            

        })
        this.allConcepts = concepts
    }

    static getAllConcepts = async () => {
        return this.allConcepts;
    }

    static getConceptElementFromClass = async (conceptClassName) => {
        if (this.allConcepts.length === 0) {
            await this.initConceptClasses();
        }
        //Copy the array so that it won't be changed by other components
        //console.log(this.conceptsByClass[conceptClassName])
        return [...this.conceptsByClass[conceptClassName]]
        
    }

    static getConceptElementById = async (conceptUUID) => {
        if (this.allConcepts.length === 0) {
            await this.initConceptClasses();
        }

        return { ...this.allConcepts[conceptUUID] }
    }

    static getSymptoms = async () => {
        return this.getConceptElementFromClass(CONCEPT_SYMPTOPM)
    }

    static getDiagnosis = async () => {
        return this.getConceptElementFromClass(CONCEPT_DIAGNOSIS)
    }

    static getProcedures = async () => {
        return this.getConceptElementFromClass(CONCEPT_PROCEDURE)
    }

    static getInvestigations = async () => {
        return this.getConceptElementFromClass(CONCEPT_INVESTIGATION)
    }

    static getDrugs = async () => {
        return this.getConceptElementFromClass(CONCEPT_DRUG)
    }

    static getVitals = async () => {
        return this.getConceptElementFromClass(CONCEPT_VITAL)
    }

    static getVisitOutcomes = async () => {
        return this.getConceptElementById(CONCEPT_OPD_VISIT_OUTCOME_UUID)
    }

}