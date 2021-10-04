import { URL_API } from 'src/constants';
import { api } from './axiosClient';

export const historyApi = {
  create: (data: any) => {
    return api.post(`${URL_API}/history`, data);
  },
  get: (userId: string, topicId: string) => {
    return api.get(
      `${URL_API}/history?userId=${userId}&topicId=${topicId}`
    );
  },
};
