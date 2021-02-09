export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
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
    (err: any) => Promise.reject(err)
  )
}
