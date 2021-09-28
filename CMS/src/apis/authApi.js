import querystring from "query-string";
import axiosClients from "./axiosClients";

const authApi = {
  login: async (values) => axiosClients.post("/auth/login", values),
  getList: async (filters) =>
    axiosClients.get(`/auth/?${querystring.stringify(filters)}`),
  getById: async (id) => axiosClients.get(`/auth/${id}`),
  update: async (id, data) => axiosClients.patch(`/auth/${id}`, data),
};

export default authApi;
