import queryString from 'query-string';
import { URL_API } from 'src/constants';
import { api } from './axiosClient';

export const topicApi = {
  getList: async (params: any) => {
    const paramsString = queryString.stringify(params);
    console.log(paramsString);
    return api.get(`${URL_API}/topic?${paramsString}`);
  },
  getBySlug: async (slug: string | string[]) => {
    return api.get(`${URL_API}/topic/${slug}`);
  },
  update: async (topicId: string | string[], views: number) => {
    return api.patch(`${URL_API}/topic/${topicId}`, {
      views: views + 1,
    });
  },
};
