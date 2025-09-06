import { create } from "zustand";
import { api } from "../lib/apiClient";
import toast from "react-hot-toast";

export const useProjectStore = create((set, get) => ({
  projects: [],
  currentProject: null,
  activity: [],
  loading: false,
  error: null,

  fetchProjects: async (search) => {
    set({ loading: true });
    try {
      const params = search ? { q: search } : {};
      const response = await api.get("/api/projects", params);
      set({ projects: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to fetch projects");
      throw error;
    }
  },

  fetchProject: async (projectId) => {
    set({ loading: true });
    try {
      const response = await api.get(`/api/projects/${projectId}`);
      set({ currentProject: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to fetch project");
      throw error;
    }
  },

  createProject: async (data) => {
    try {
      const response = await api.post("/api/projects", data);
      set((state) => ({ projects: [...state.projects, response.data] }));
      toast.success("Project created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create project");
      throw error;
    }
  },

  updateProject: async (projectId, data) => {
    try {
      const response = await api.patch(`/api/projects/${projectId}`, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === projectId ? response.data : p
        ),
        currentProject:
          state.currentProject?._id === projectId
            ? response.data
            : state.currentProject,
      }));
      toast.success("Project updated");
      return response.data;
    } catch (error) {
      toast.error("Failed to update project");
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    try {
      await api.delete(`/api/projects/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== projectId),
        currentProject:
          state.currentProject?._id === projectId ? null : state.currentProject,
      }));
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Failed to delete project");
      throw error;
    }
  },

  addMember: async (projectId, userId, role) => {
    try {
      const response = await api.post(`/api/projects/${projectId}/members`, {
        userId,
        role,
      });
      set({ currentProject: response.data });
      toast.success("Member added");
      return response.data;
    } catch (error) {
      toast.error("Failed to add member");
      throw error;
    }
  },

  updateMember: async (projectId, userId, role) => {
    try {
      const response = await api.patch(
        `/api/projects/${projectId}/members/${userId}`,
        { role }
      );
      set({ currentProject: response.data });
      toast.success("Member role updated");
      return response.data;
    } catch (error) {
      toast.error("Failed to update member");
      throw error;
    }
  },

  removeMember: async (projectId, userId) => {
    try {
      const response = await api.delete(
        `/api/projects/${projectId}/members/${userId}`
      );
      set({ currentProject: response.data });
      toast.success("Member removed");
      return response.data;
    } catch (error) {
      toast.error("Failed to remove member");
      throw error;
    }
  },

  fetchActivity: async (projectId, page = 1, limit = 20) => {
    try {
      const response = await api.get(`/api/projects/${projectId}/activity`, {
        page,
        limit,
      });
      set({ activity: response.data });
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch activity");
      throw error;
    }
  },
}));
