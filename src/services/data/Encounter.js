import {
    getAPI,
    remapArrayWithField,
} from '../index'

export class Encounter {
    static encounterTypes = [];

    static initEncounterTypes = async () => {
        const encounterTypeUrl = '/encountertype?v=custom:(uuid,display,name)'

        let tempEncounterTypes = (await getAPI(encounterTypeUrl)).data.results

        
        remapArrayWithField(tempEncounterTypes,"display")
        console.log("Encounter types are  ", tempEncounterTypes)
        return tempEncounterTypes
    }

    static getConceptElement = async (conceptClassName)=>{
        if (this.encounterTypes.length===0) {
          return  await this.initEncounterTypes();
        }
        //Copy the array so that it won't be changed by other components
        return [...this.conceptsByClass[conceptClassName]]
    }

    static getEncounterTypes = async () => {
        return this.getConceptElement("encounterElement")
    }

}