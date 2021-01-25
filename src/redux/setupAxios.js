export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        // auth: { authToken, user, client, expiry, token }
        auth: { authToken },
      } = store.getState()

      if (authToken) {
        config.headers['token-type'] = 'Bearer'
        // config.headers.Authorization = `Bearer ${authToken}`;
        // config.headers.uid = user.uid;
        // config.headers.client = client;
        // config.headers.expiry = expiry;
        // config.headers["access-token"] = token;
      }

      return config
    },
    (err) => Promise.reject(err)
  )
}
