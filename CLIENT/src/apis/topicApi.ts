import queryString from 'query-string';
import { api } from './axiosClient';

const topicApi = {
  getList: async (params: any) => {
    const paramsString = queryString.stringify(params);
    console.log(paramsString);
    return api.get(`https://tracnghiemonline01.herokuapp.com/api/topic?${paramsString}`);
  },
  getBySlug: async (slug: string | string[]) => {
    return api.get(`https://tracnghiemonline01.herokuapp.com/api/topic/${slug}`);
  },
};

export default topicApi;
