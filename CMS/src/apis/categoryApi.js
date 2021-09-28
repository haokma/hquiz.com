import queryString from "query-string";
import axiosClients from "./axiosClients";

const categoryApi = {
  create: async (data) => {
    const url = "/category";
    return axiosClients.post(url, data);
  },
  getList: async (filters) => {
    const paramsString = queryString.stringify(filters);
    const url = `/category/?${paramsString}`;
    return axiosClients.get(url);
  },
  getSubList: async (filters) => {
    const paramsString = queryString.stringify(filters);
    const url = `/category/get-list-sub?${paramsString}`;
    return axiosClients.get(url);
  },
  getById: async (id) => {
    const url = `/category/${id}`;
    return axiosClients.get(url);
  },
  delete: async (id) => {
    const url = `/category`;
    return axiosClients.patch(url, id);
  },
  update: async (id, data) => {
    const url = `/category/${id}`;
    return axiosClients.patch(url, data);
  },
};

export default categoryApi;
