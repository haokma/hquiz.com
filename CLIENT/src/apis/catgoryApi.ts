import { api } from './axiosClient';

const categoryApi = {
  getList: async () => {
    return api.get('http://localhost:5000/api/category');
  },
};

export default categoryApi;
