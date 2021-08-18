import {
    getAPI,
    remapArrayWithField
} from '../index'
export class VitalSigns {

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */
    static getAll = async () => {
        //const url1 = '/visit?v=custom:(uuid,patient:(uuid,display,person:(gender,age,birthdate)),visitType:(display),location:(display),startDatetime,encounters:(uuid,encounterDatetime,encounterType:(display),obs:(uuid,display)))&includeInactive=false'

        const url = "/concept?q=Vital Signs&v=custom:(answers:(uuid,display,datatype:(display),answers:(uuid,display),description:(display)))";

        let signs = (await getAPI(url)).data.results
        console.log("signs is ",signs)
        return signs

    }

}