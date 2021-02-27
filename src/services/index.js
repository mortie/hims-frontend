import axios from "axios";
import Cookies from "js-cookie";
import { JSESSIONID, BASE_URL } from "../utils/constants";

export function getAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URL + endpoint, config);
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
  return axios.post(BASE_URL + endpoint, data, config);
}
