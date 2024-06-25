import BaseApi from "../api/BaseApi";
// import { createObject } from "utils/nikitaFunction";

class BaseService {
  async get(path, config) {
    const { data } = await BaseApi().get(path, config);
    return data;
  }

  async getById(path, id) {
    const { data } = await BaseApi().get(`${path}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }

  async post(path, data, config) {
    return await BaseApi().post(path, data, config);
  }

  async update(data, id) {
    return await BaseApi().put(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async delete(path, id) {
    //dev.dikahadir.com/dts/mobile.del_user/?&id=222
    return await BaseApi().delete(path, id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}
export default BaseService;
