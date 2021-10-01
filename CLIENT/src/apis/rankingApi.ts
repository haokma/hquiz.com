import { URL_API } from 'src/constants';
import { api } from './axiosClient';

const rankingApi = {
  create: (data: any) => {
    return api.post(`${URL_API}/ranking`, data);
  },
  getList: (topicId: string) => {
    return api.get(`${URL_API}/ranking/${topicId}`);
  },
};

export default rankingApi;
