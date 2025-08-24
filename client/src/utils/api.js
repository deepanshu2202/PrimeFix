import axios from "axios";

// Base
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// auth
export const getMe = async () => await api.get("auth/me");
export const logoutUser = async () => await api.get("/auth/logout");
export const loginUser = async (data) => await api.post("/auth/login", data);
export const signUpUser = async (data) => await api.post("/auth/register", data);
export const updateProfile = async (data) =>await api.put("auth/me", data);