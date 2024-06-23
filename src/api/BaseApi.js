/* eslint-disable no-undef */
import axios from "axios";

export default function BaseApi() {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    responseType: "json",
    //  headers: {
    //    Authorization: localStorage.getItem('token'),
    //  },
  });
}
