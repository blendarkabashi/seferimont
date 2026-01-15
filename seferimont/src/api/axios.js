import axios from "axios";

const api = axios.create({
  baseURL: "https://sm-backend-rc9ehzhvk-my-team-20db5e78.vercel.app/",
});

export const initializeAxiosInterceptor = () => {
  api.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export default api;
