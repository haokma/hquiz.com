import queryString from 'query-string';
import axiosClients from './axiosClients';

const historyApi = {
  getList: (filters) => {
    const pramesString = queryString.stringify(filters);
    const url = `/history?${pramesString}`;
    return axiosClients.get(url);
  },
  delete: (data) => {
    const url = `/history`;
    return axiosClients.patch(url, data);
  }
};

export default historyApi;
