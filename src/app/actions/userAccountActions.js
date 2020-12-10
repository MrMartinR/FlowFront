import axios from "axios";
import { API_URL } from "./../modules/Auth/_redux/authCrud";

export const getUserAccounts = (headerPara) => {
  return axios.get(`${API_URL}/api/v1/user_accounts`, {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  });
};