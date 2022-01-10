import {
    getAPI
} from '../index'
export class TestOrderDetails {

    /**
     * returns all Patient Details List.
     * @param {string} fields given as argument Parameter to search
     */
    static TestOrderDetailsDataFunc= async (uid,orderdate) => {
        const url = `/procedureinvestigationorder/patient?patient=`+uid+`&date=`+orderdate;
        try{
            let patient = (await getAPI(url)).data
            return patient

        }
        catch(err)
        {
            return null
        }

    }
    static TestOnlySelectDateFunc= async (orderdate) => {
        const url = `/procedureinvestigationorder/patient?date=`+orderdate;
        try{
            let patient = (await getAPI(url)).data
            return patient

        }
        catch(err)
        {
            return null
        }

    }
    
}