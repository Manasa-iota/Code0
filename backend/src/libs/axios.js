import axios from "axios";
import { env } from "./env.js";

export const axiosInstance = axios.create({
  baseURL: env.JUDGE0_API_URL,
  headers: {
    Accept: "application/json",
  },
});
