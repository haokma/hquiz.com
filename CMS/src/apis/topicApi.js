import queryString from 'query-string';
import axiosClients from './axiosClients';

const topicApi = {
  create: async (data) => {
    const url = `/topic`;
    return axiosClients.post(url, data);
  },
  getById: async (id) => {
    const url = `/topic/${id}`;
    return axiosClients.get(url);
  },
  getList: async (filters) => {
    const paramsString = queryString.stringify(filters);
    const url = `/topic?${paramsString}`;
    return axiosClients.get(url);
  },
  delete: async (topicId) => {
    const url = `/topic/delete`;
    return axiosClients.patch(url, topicId);
  },
  update: async (id, newTopic) => {
    const url = `/topic/${id}`;
    return axiosClients.patch(url, newTopic);
  }
};
export default topicApi;
