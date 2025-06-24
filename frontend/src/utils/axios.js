import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalReq = err.config;

    if (
      err.response?.status === 401 &&
      !originalReq._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalReq))
          .catch((e) => Promise.reject(e));
      }

      originalReq._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axiosClient
          .post("/auth/refresh")
          .then(() => {
            processQueue(null);
            resolve(axiosClient(originalReq));
          })
          .catch((refreshError) => {
            processQueue(refreshError);
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(err);
  }
);
