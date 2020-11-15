import axios from "axios";
import { API_URL } from "./../modules/Auth/_redux/authCrud";

export const updateUserAccountDetails = (headerPara, uid, details) => {
  return axios.post(`${API_URL}/api/v1/user_accounts/${uid}`, details, {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  });
};

export const getUserProfile = (headerPara) => {
  return axios.get(`${API_URL}/api/v1/user_profile`, {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  });
};
