import {
    getAPI
} from '../index'
export class Patient {

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */
    static getPatientWithId = async (id) => {
        const url = `/patient/${id}?v=custom:(uuid,identifiers:(identifier),display,person:(display,gender,age,birthdate))`

        let patient = (await getAPI(url)).data

        patient.encounters = await this.getEncountersWithPatientId(id)


        return patient

    }

    static getEncountersWithPatientId = async (patientId) =>{
        const url = `/encounter?patient=${patientId}&v=custom:(uuid,encounterDatetime,encounterType:(display),obs:(uuid,display))`

        let encounters = (await getAPI(url)).data.results
        return encounters
    }

}