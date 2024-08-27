import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://14.225.217.207:8081/api/",
});

// Add a request interceptor làm hành động gì đó trước khi call api
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

export default api;
