import axios from "axios";
import Cookies from "js-cookie";
import { updateSession } from "../utils/authentication";
import { JSESSIONID, BASE_URL,ADRESSBASE_URL_API,MPI_URL} from "../utils/constants";

export function getOnlineAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(MPI_URL + endpoint, config);
}
export function getAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URL + endpoint, config);
}

export function getaddressAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(ADRESSBASE_URL_API + endpoint, config);
}

export function getPatientSearch(endpoint, authorization = Cookies.get(JSESSIONID)) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(ADRESSBASE_URL_API + endpoint, config);
}

export function getImageAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    responseType: "blob",
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URL + endpoint, config);
}
export function postCentralAPI(
  endpoint,
  data,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.post(MPI_URL + endpoint, data, config);
}
export function postAPI(
  endpoint,
  data,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.post(BASE_URL + endpoint, data, config);
}

export function deleteAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.delete(BASE_URL + endpoint, config);
}

/**
 * This function remaps array with a specific field. For example if we want an array to be accessed
 * through the uuid function we pass 'uuid' to fieldToMapWith. This way, each element of an array
 * can be easily accessed because the element is just accessed through the uuid Property.
 * @param {*} array the array containing all elements.
 * @param {*} fieldToMapWith the field to look for in individual elements which will be used as the index
 */
export function remapArrayWithField(array,fieldToMapWith){
  array.forEach(element => {
    array[element[fieldToMapWith]]=element
  });
}
export async function statusAppointment(appointmentId,status) {
  
  const URL = `/onlineappointment/appointmentstatus?appointment_id=${appointmentId}&status=${status}`;
  try {
    const data = await postCentralAPI(URL);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finished");
  }
}

