import { CONCEPT_DIAGNOSIS, CONCEPT_DRUG, CONCEPT_INVESTIGATION, CONCEPT_PROCEDURE, CONCEPT_SYMPTOPM, CONCEPT_VITAL } from '../../utils/constants';
import {
    getAPI,
    remapArrayWithField,
} from '../index'



export class Concept {
    static allConcepts = [];
    static conceptsByClass = {};

    static initConceptClasses = async () => {
        const conceptsUrl = '/concept?v=custom:(uuid,display,conceptClass:(uuid,display))'

        let concepts = (await getAPI(conceptsUrl)).data.results

        concepts.forEach(concept => {
            this.allConcepts[concept.uuid]=concept
            if(!this.conceptsByClass[concept.conceptClass.display]){
                this.conceptsByClass[concept.conceptClass.display]=[]
            }
            this.conceptsByClass[concept.conceptClass.display].push(concept)
        })

        console.log("concepts are ", this.conceptsByClass)

        this.allConcepts = concepts
    }

    static getConceptElement = async (conceptClassName)=>{
        if (this.allConcepts.length===0) {
            await this.initConceptClasses();
        }
        //Copy the array so that it won't be changed by other components
        return [...this.conceptsByClass[conceptClassName]]
    }

    static getSymptoms = async () => {
        return this.getConceptElement(CONCEPT_SYMPTOPM)
    }

    static getDiagnosis = async ()=>{
        return this.getConceptElement(CONCEPT_DIAGNOSIS)
    }

    static getProcedures = async ()=>{
        return this.getConceptElement(CONCEPT_PROCEDURE)
    }

    static getInvestigations = async ()=>{
        return this.getConceptElement(CONCEPT_INVESTIGATION)
    }

    static getDrugs = async ()=>{
        return this.getConceptElement(CONCEPT_DRUG)
    }

    static getVitals = async ()=>{
        return this.getConceptElement(CONCEPT_VITAL)
    }

}