import {
    getAPI,
    postAPI
} from '../index'
export class PatientHistory {

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */
    static savePatientHistory = async (payload) => {
        const url = `/encounter`

        let response = (await postAPI(url,payload))
        return response

    }
}