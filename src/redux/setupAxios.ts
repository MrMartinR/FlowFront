export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: { authToken },
      } = store.getState()

      if (authToken) {
        config.headers['token-type'] = 'Bearer'
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}
