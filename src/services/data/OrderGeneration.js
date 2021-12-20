import {
    postAPI
} from '../index'
export class OrderGeneration {

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */
    static saveOrder = async (payload) => {
        const url = `/orders/patient`

        let response = (await postAPI(url,payload))
        return response

    }
}