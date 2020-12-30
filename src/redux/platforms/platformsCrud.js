import axios from "axios";
import store from "../../redux/store";

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
      client: client,
      expiry: expiry,
      uid: user.email,
    },
  };
  return options;
};

const API_URL = "http://localhost:3001";
// const API_URL = 'https://api.flowfin.tech';
// const API_URL = process.env.API_URL;
export const ACCOUNT_URL = API_URL + "/api/v1/platforms";

export function getAllAccounts() {
  return axios.get(ACCOUNT_URL, optionsHeaders());
}
