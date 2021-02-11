import axios from "axios";
import Cookies from "js-cookie";
import { JSESSIONID } from "../utils/constants";

const BASE_URI_PROD = "https://ln3.hispindia.org/openmrs/ws/rest/v1";
const BASE_URI_DEV = "http://localhost:8080/openmrs-new/ws/rest/v1";

export function getAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    // signal: signal,
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URI_PROD + endpoint, config);
}

export function getImageAPI(endpoint, signal, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    signal: signal,
    responseType: "blob",
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URI_PROD + endpoint, config);
}

export function postAPI(
  endpoint,
  data,
  authorization = Cookies.get(JSESSIONID)
) {
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.post(BASE_URI_PROD + endpoint, data, config);
}
