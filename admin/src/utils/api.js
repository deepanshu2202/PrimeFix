import axios from "axios";

// Base
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export const getAdmin = async () => await api.get('/auth/me-admin');
export const getAllUsers = async () => await api.get('/auth/users-admin');
export const logoutAdmin = async () => await api.get('/auth/logout-admin');
export const getAllTickets = async () => await api.get('/ticket/get-admin');
export const loginAdmin = async (data) => await api.post('/auth/login-admin', data);
export const promoteUser = async (data) => await api.put('auth/promote-admin', data);
export const addWorker = async (data) => await api.put('/ticket/add-worker-admin', data);