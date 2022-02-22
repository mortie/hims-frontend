import {
    getAPI,
    remapArrayWithField
} from '../index'
export class Category {

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */
    static getAll = async ({
        fields = [
            'uuid',
            'display',
        ]
    }) => {
        let categories = (await getAPI(
            `/concept?q=services%20ordered&v=custom:(answers:(${fields.join()}))`
        )).data.results;

        remapArrayWithField(categories, 'uuid');
        return categories[0].answers;

    }

}
