import {
    getAPI,
    remapArrayWithField
} from '../index'
export class Location {

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
        let locations = (await getAPI(
            `/location?v=custom:(${fields.join()})`
        )).data.results

        remapArrayWithField(locations, 'uuid')
        return locations

    }

}