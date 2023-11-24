import Axios from 'axios';
import Cookies from "universal-cookie";

const axiosInstance = Axios.create({
    timeout: 3 * 60 * 1000,
    baseURL: 'http://localhost:5555',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const cookies = new Cookies();
        const token = cookies.get('TOKEN');
      if (config) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          }
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export const sendGet = (url, params) => axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url, params, queryParams) => axiosInstance.post(url, params, { params: queryParams }).then((res) => res.data);
export const sendPut = (url, params) => axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url, params) => axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url, params) => axiosInstance.delete(url, { data: params } ).then((res) => res.data);