import axios from "axios";

export const API_BASE = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE,
});

const ADMIN_KEY = "bookflow_admin_v1";
const USER_KEY = "bookflow_user_v1";

export function setAdmin(admin) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function getAdmin() {
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAdmin() {
  localStorage.removeItem(ADMIN_KEY);
}

export function adminHeaders() {
  const admin = getAdmin();
  if (!admin) return {};
  return {
    "admin-username": admin.username,
    "admin-password": admin.password,
  };
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}
