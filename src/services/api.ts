'use server'

import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Accept": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
