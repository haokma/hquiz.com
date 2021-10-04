import { URL_API } from 'src/constants';
import { api } from './axiosClient';

export const categoryApi = {
  getList: async () => {
    return api.get(`${URL_API}/category`);
  },
};
