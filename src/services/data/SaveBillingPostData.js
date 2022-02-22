import { postAPI } from "../index";
export class SaveBillingPostData {
  /**
   * returns all Locations with a paging and fields specified.
   * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
   */
  static saveBillingData = async (payload) => {
    const url = `/procedureinvestigationorder/patient`;

    try {
      let response = await postAPI(url, payload);
      return true;
    } catch (err) {
      return false;
    }
  };
}
