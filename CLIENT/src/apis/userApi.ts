import { api } from './axiosClient';
import { URL_API } from 'src/constants';
import { AUTH_LOGIN, AUTH_REGISTER } from 'src/interfaces';

export const userApi = {
  register: (data: AUTH_REGISTER) => {
    return api.post(`${URL_API}/auth/register`, data);
  },
  login: (data: AUTH_LOGIN) => {
    return api.post(`${URL_API}/auth/login`, data);
  },
};
