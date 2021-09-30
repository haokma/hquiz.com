import { api } from './axiosClient';

const rankingApi = {
  create: (data: any) => {
    return api.post(`https://tracnghiemonline01.herokuapp.com/api/ranking`, data);
  },
  getList: (topicId: string) => {
    return api.get(`https://tracnghiemonline01.herokuapp.com/api/ranking/${topicId}`);
  },
};

export default rankingApi;
