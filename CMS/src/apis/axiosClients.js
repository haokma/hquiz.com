import axios from 'axios';
import { URL_API } from '../constants';

const axiosClients = axios.create({
  baseURL: `${URL_API}`
});
axiosClients.interceptors.request.use(
  function config(config) {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers.Authorization = `Beared ${token}`;
    return config;
  },
  function error(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function response(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function error(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    throw error;
  }
);
export default axiosClients;
