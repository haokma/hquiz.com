import { URL_API } from '../constants';
import { api } from './axiosClient';

const categoryApi = {
  getList: async () => {
    return api.get(`${URL_API}/category`);
  },
};

export default categoryApi;
