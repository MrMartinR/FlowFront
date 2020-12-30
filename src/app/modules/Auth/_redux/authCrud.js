import axios from "axios";
var _API_URL = "https://evening-fjord-12692.herokuapp.com/";
var FORGOT_PASSWORD_CALLBACK = "https://flowfront.herokuapp.com";

if (process.env.NODE_ENV === "development") {
  _API_URL = "https://evening-fjord-12692.herokuapp.com/";
  FORGOT_PASSWORD_CALLBACK = "http://localhost:3000";
}

// if (process.env.NODE_ENV === 'production') {
// _API_URL = 'https://flowappdev.herokuapp.com'
_API_URL = "http://localhost:3001";
// }

export const API_URL = _API_URL;
export const LOGIN_URL = _API_URL + "/api/v1/auth/sign_in";
export const REGISTER_URL = _API_URL + "/api/v1/auth";
export const REQUEST_PASSWORD_URL = _API_URL + "/api/v1/auth/password";
export const SUBMIT_PASSWORD_URL = _API_URL + "/api/v1/auth/password";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(
    LOGIN_URL,
    { user: { email: email, password: password } },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, {
    user: { email, fullname, username, password },
  });
}

export function requestPassword(email, redirect_url) {
  console.log("REQUESTPASSWORD-- " + REQUEST_PASSWORD_URL);
  redirect_url = FORGOT_PASSWORD_CALLBACK + "/auth/forgot-password-actions";
  return axios.post(REQUEST_PASSWORD_URL, { email, redirect_url });
}

export function submitRequestPassword(
  password,
  password_confirmation,
  access_token,
  client,
  uid,
  expiry
) {
  console.log("submitRequestPassword-- " + access_token);

  return axios.put(
    SUBMIT_PASSWORD_URL,
    { password, password_confirmation },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": access_token,
        client: client,
        uid: uid,
        expiry: expiry,
      },
    }
  );
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
