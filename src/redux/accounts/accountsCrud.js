import axios from "axios";

const options = {
  headers: {
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Type": "application/json; charset=utf-8",
    "access-token": "MiZMCEa5nVwGpCuWGwsf2A",
    "token-type": "Bearer",
    "client": "8Kva7F90IbIgwEzrPqhRHQ",
    "expiry": "1592930535",
    "uid": "admin@flowapp.com"
  }
};

const API_URL = 'http://localhost:3001';
// const API_URL = process.env;
export const ACCOUNT_URL = API_URL + "/api/v1/accounts";

// CREATE =>  POST: add a new customer to the server
export function createAccount(customer) {
  return axios.post(ACCOUNT_URL, { customer });
}

// READ
export function getAllAccounts() {
  return axios.get(ACCOUNT_URL);
}

export function getAccountById(customerId) {
  return axios.get(`${ACCOUNT_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findAccounts(queryParams) {
  let a = axios.get(`${ACCOUNT_URL}?page=1&per_page=10`, options);
  console.log('a', a)
  return a;
}

// UPDATE => PUT: update the customer on the server
export function updateAccount(customer) {
  return axios.put(`${ACCOUNT_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForAccounts(ids, status) {
  return axios.post(`${ACCOUNT_URL}/updateStatusForAccounts`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteAccount(customerId) {
  return axios.delete(`${ACCOUNT_URL}/${customerId}`);
}

// DELETE Accounts by ids
export function deleteAccounts(ids) {
  return axios.post(`${ACCOUNT_URL}/deleteAccounts`, { ids });
}
