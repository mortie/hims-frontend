/* eslint-disable import/no-anonymous-default-export */
import { encrypt, decrypt, getRandomNumber } from "../utils/encryption";
import axios from "axios";

const BASE_URI_PROD = "https://ln3.hispindia.org/openmrs/ws/rest/v1";
const BASE_URI_DEV = "http://localhost:8080/openmrs-new/ws/rest/v1";

export function getAPI(endpoint, username, password) {
  const config = {
    headers: {
      Authorization: decrypt(encrypt(`${username}:${password}`, getRandomNumber(0, 9))),
    },
  };
  return axios.get(BASE_URI_PROD + endpoint, config);
}
