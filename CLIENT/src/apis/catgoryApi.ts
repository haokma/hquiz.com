import { api } from './axiosClient';

const categoryApi = {
  getList: async () => {
    return api.get('https://tracnghiemonline01.herokuapp.com/api/category');
  },
};

export default categoryApi;
