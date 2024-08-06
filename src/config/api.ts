import axios from "axios";

const api = axios.create({
  baseURL: "http://142.93.49.109:8080/api/",
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
