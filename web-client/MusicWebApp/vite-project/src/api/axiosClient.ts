import axios from "axios";
import { authService } from "../auth/auth.service";

const axiosClient = axios.create({
  baseURL: "https://localhost:7230/api",
});
console.log("BASE URL:", axiosClient.defaults.baseURL);


axiosClient.interceptors.request.use((config) => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
