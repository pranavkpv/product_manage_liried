import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (config.url.includes("/auth/login")) {
      return config;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${ token }`;
      return config;
    }

    try {
      const res = await api.get("/auth/refresh");
      const newToken = res.data.accessToken;

      localStorage.setItem("accessToken", newToken);
      config.headers.Authorization = `Bearer ${ newToken }`;

      return config;
    } catch (err) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
      return Promise.reject(err);
    }
  },
  (error) => Promise.reject(error)
);

export default api;


