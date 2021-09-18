import { ENCOUNTER_TYPE_PATIENT_HISTORY } from '../../utils/constants';
import {
    getAPI,
    remapArrayWithField,
} from '../index'

export class Encounter {
    static encounterTypes = [];

    static initEncounterTypes = async () => {
        const encounterTypeUrl = '/encountertype?v=custom:(uuid,display,name)'

        let tempEncounterTypes = (await getAPI(encounterTypeUrl)).data.results
        console.log("fetching encounter types", tempEncounterTypes)


        remapArrayWithField(tempEncounterTypes, "display")
        this.encounterTypes = tempEncounterTypes
        return tempEncounterTypes
    }

    static getEncounterElement = async (conceptClassName) => {
    }

    static getAllEncounterTypes = async () => {
        if (this.encounterTypes.length === 0) {
            return await this.initEncounterTypes();
        }
        //Copy the array so that it won't be changed by other components
        return this.encounterTypes
    }

    static getPatientHistoryEncounterType = async () => {
        return (await this.getAllEncounterTypes())[ENCOUNTER_TYPE_PATIENT_HISTORY]
    }

}