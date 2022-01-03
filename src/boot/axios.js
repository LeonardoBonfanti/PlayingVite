
// import { boot } from 'quasar/wrappers';
import axios from 'axios';

const Status = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

axios.interceptors.response.use(
  async (response) => {
    if (
      response &&
      (response.status === Status.BAD_REQUEST ||
        response.status === Status.UNAUTHORIZED ||
        response.status === Status.NOT_FOUND ||
        response.status === Status.SERVER_ERROR)
    ) {
      return Promise.reject(new Error(JSON.stringify(response.data.message)));
    }

    return response;
  },
  async (error) => Promise.reject(error)
);

let baseUrl;

if (import.meta.env.VITE_APP_PRODUCTION === 'false') {
  baseUrl = import.meta.env.VITE_REQUEST_BASE_URL_DEV;
} else {
  baseUrl = import.meta.env.VITE_REQUEST_BASE_URL_PROD;
}

const api = axios.create({ baseURL: baseUrl });

// export default boot(({ app, store }) => {
//   api.interceptors.request.use(
    // function (config) {
    //   const token = store.getters['auth/token'];

    //   config.headers['Authorization'] = 'Bearer ' + token;
    //   return config;
    // },
    // function (error) {
    //   return Promise.reject(error);
    // }
  // );

  // for use inside Vue files (Options API) through this.$axios and this.$api

  // app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
// });

export { api };