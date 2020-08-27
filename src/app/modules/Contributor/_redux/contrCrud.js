import axios from "axios";
export const API_URL = "http://localhost:3000"
export const LOGIN_URL = API_URL+"/api/v1/auth/sign_in";
export const REGISTER_URL = API_URL+"/api/v1/auth";
export const REQUEST_PASSWORD_URL = API_URL+"/api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { user: {email: email, password: password} }, {
    headers: { 'Content-Type': 'application/json' }
  });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { user:{email, fullname, username, password }});
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
