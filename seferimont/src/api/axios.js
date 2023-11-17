import axios from "axios";

export const initializeAxiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      console.log(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("headers", config.headers);
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
