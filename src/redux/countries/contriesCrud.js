import axios from "axios";
import store from "../store";

const optionsHeaders = () => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState();

  const options = {
    headers: {
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Type": "application/json; charset=utf-8",
      "access-token": token,
      "token-type": "Bearer",
      "client": client,
      "expiry": expiry,
      "uid": user.email
    }
  };
  return options;
}


const API_URL = 'http://localhost:3001';
// const API_URL = process.env.API_URL;
export const COUNTRY_URL = API_URL + "/api/v1/contries";

// CREATE =>  POST: add a new contries to the server
export function createcontry(contries) {
  return axios.post(COUNTRY_URL, { contries });
}

// READ
export function getAllContries() {
  return axios.get(COUNTRY_URL, optionsHeaders());
}

export function getcontryById(contryId) {
  return axios.get(`${COUNTRY_URL}/${contryId}`, optionsHeaders());
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findContries({ page, perPage = 10 }) {
  return axios.get(`${COUNTRY_URL}?page=${page}&per_page=${perPage}`, optionsHeaders());
}

// UPDATE => PUT: update the contry on the server
export function updatecontry(contry) {
  return axios.put(`${COUNTRY_URL}/${contry.id}`, { contry });
}

// UPDATE Status
export function updateStatusForContries(ids, status) {
  return axios.post(`${COUNTRY_URL}/updateStatusForContries`, {
    ids,
    status
  });
}

// DELETE => delete the contries from the server
export function deletecontry(contryId) {
  return axios.delete(`${COUNTRY_URL}/${contryId}`);
}

// DELETE Contries by ids
export function deleteContries(ids) {
  return axios.post(`${COUNTRY_URL}/deleteContries`, { ids });
}
