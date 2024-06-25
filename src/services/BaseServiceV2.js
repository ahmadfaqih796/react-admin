import BaseApi from "api/BaseApi";

const BaseServiceV2 = {
  findAll: async (url, params = {}) => {
    return await BaseApi().get(url, {
      params: params,
    });
  },
  create: async (url, payload) => {
    const { data } = await BaseApi().post(url, payload);
    return data;
  },
  createRooms: async (payload) => {
    const { data } = await BaseApi().post("/rooms", payload);
    return data;
  },
  delete: async (url, id) => {
    const { data } = await BaseApi().delete(`/${url}/${id}`);
    return data;
  },
};

export default BaseServiceV2;
