import {
    getAPI,
    remapArrayWithField
} from '../index'
export class Visit {

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */
    static getAll = async ({
        fields = [
            'uuid',
            'display'
        ]
    }) => {
        //const url1 = '/visit?v=custom:(uuid,patient:(uuid,display,person:(gender,age,birthdate)),visitType:(display),location:(display),startDatetime,encounters:(uuid,encounterDatetime,encounterType:(display),obs:(uuid,display)))&includeInactive=false'

        const url = '/visit?v=custom:(uuid,patient:(uuid,identifiers:(identifier),display,person:(display,gender,age,birthdate)),location:(display),startDatetime)&includeInactive=false'

        let visits = (await getAPI(url)).data.results
        remapArrayWithField(visits,'uuid')
        return visits

    }

}