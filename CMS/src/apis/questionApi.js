import queryString from 'query-string';
import axiosClients from './axiosClients';

const questionApi = {
  getList: async (filters) => {
    const url = `/question?${queryString.stringify(filters)}`;
    return axiosClients.get(url);
  },
  create: async (data) => {
    const url = 'question/create';
    return axiosClients.post(url, data);
  },
  delete: async (questionId) => {
    const url = `/question/delete`;
    return axiosClients.patch(url, questionId);
  }
};
export default questionApi;
