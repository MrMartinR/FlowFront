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


const API_URL = 'https://api.flowfin.tech';
// const API_URL = process.env.API_URL;

// // Works for Accounts
// export const ACCOUNT_URL = API_URL + "/api/v1/accounts";

// // CREATE =>  POST: add a new account to the server user_accounts
// export function createAccount(account) {
//   // console.log("ACCOUNT: ", account);
//   return axios.post(ACCOUNT_URL, { account });
// }

// // READ
// export function getAllAccounts() {
//   return axios.get(ACCOUNT_URL);
// }

// export function getAccountById(accountId) {
//   return axios.get(`${ACCOUNT_URL}/${accountId}`, optionsHeaders());
// }

// // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// // items => filtered/sorted result
// export function findAccounts({ page, perPage = 10 }) {
//   return axios.get(`${ACCOUNT_URL}?page=${page}&per_page=${perPage}`, optionsHeaders());
// }

// // This works similar to findAccounts. The difference is that rather than replacing existing data,
// // its append new data to existing data. Usefull for implementing infinite list where new data is loaded on demand.
// export function findNextAccounts({ page, perPage = 10 }) {
//   return axios.get(`${ACCOUNT_URL}?page=${page}&per_page=${perPage}`, optionsHeaders());
// }

// // UPDATE => PUT: update the account on the server
// export function updateAccount(account) {
//   return axios.put(`${ACCOUNT_URL}/${account.id}`, { account });
// }

// // UPDATE Status
// export function updateStatusForAccounts(ids, status) {
//   return axios.post(`${ACCOUNT_URL}/updateStatusForAccounts`, {
//     ids,
//     status
//   });
// }

// // DELETE => delete the account from the server
// export function deleteAccount(accountId) {
//   return axios.delete(`${ACCOUNT_URL}/${accountId}`);
// }

// // DELETE Accounts by ids
// export function deleteAccounts(ids) {
//   return axios.post(`${ACCOUNT_URL}/deleteAccounts`, { ids });
// }


// Works for User Accounts
export const USER_ACCOUNT_URL = API_URL + "/api/v1/user_accounts";

// CREATE =>  POST: add a new account to the server user_accounts
export function createUserAccount(account) {
  // console.log("ACCOUNT: ", account);
  return axios.post(USER_ACCOUNT_URL, { account });
}

// READ
export function getAllUserAccounts() {
  return axios.get(USER_ACCOUNT_URL);
}

export function getUserAccountById(accountId) {
  return axios.get(`${USER_ACCOUNT_URL}/${accountId}`, optionsHeaders());
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUserAccounts({ page, perPage = 10 }) {
  return axios.get(`${USER_ACCOUNT_URL}?page=${page}&per_page=${perPage}`, optionsHeaders());
}

// This works similar to findAccounts. The difference is that rather than replacing existing data,
// its append new data to existing data. Usefull for implementing infinite list where new data is loaded on demand.
export function findNextUserAccounts({ page, perPage = 10 }) {
  return axios.get(`${USER_ACCOUNT_URL}?page=${page}&per_page=${perPage}`, optionsHeaders());
}

// UPDATE => PUT: update the account on the server
export function updateUserAccount(account) {
  return axios.put(`${USER_ACCOUNT_URL}/${account.id}`, { account });
}

// UPDATE Status
export function updateStatusForUserAccounts(ids, status) {
  return axios.post(`${USER_ACCOUNT_URL}/updateStatusforuseraccounts`, {
    ids,
    status
  });
}

// // DELETE => delete the account from the server
export function deleteUserAccount(accountId) {
  return axios.delete(`${USER_ACCOUNT_URL}/${accountId}`);
}

// // DELETE Accounts by ids
export function deleteUserAccounts(ids) {
  return axios.post(`${USER_ACCOUNT_URL}/deleteAccounts`, { ids });
}