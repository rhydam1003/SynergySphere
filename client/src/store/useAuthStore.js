import { create } from "zustand";
import { api } from "../lib/apiClient";
import { auth } from "../lib/auth";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  token: auth.getToken(),
  user: auth.getUser(),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { accessToken, user } = response.data;

      auth.setToken(accessToken);
      auth.setUser(user);

      set({ token: accessToken, user, loading: false });
      toast.success("Welcome back!");
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/api/auth/register", data);
      const { accessToken, user } = response.data;

      auth.setToken(accessToken);
      auth.setUser(user);

      set({ token: accessToken, user, loading: false });
      toast.success("Account created successfully!");
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },

  fetchMe: async () => {
    try {
      const response = await api.get("/api/auth/me");
      const user = response.data;
      auth.setUser(user);
      set({ user });
      return user;
    } catch (error) {
      if (error.message.includes("401")) {
        get().logout();
      }
      throw error;
    }
  },

  logout: () => {
    auth.logout();
    set({ token: null, user: null });
  },

  isAuthenticated: () => !!get().token,
}));
