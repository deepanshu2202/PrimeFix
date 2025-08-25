import axios from "axios";

// Base
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export const getAdmin = async () => await api.get('/auth/me-admin');
export const logoutAdmin = async () => await api.get('/auth/logout-admin');
export const loginAdmin = async (data) => await api.post('/auth/login-admin', data);