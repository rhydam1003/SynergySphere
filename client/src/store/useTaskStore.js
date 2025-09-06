import { create } from "zustand";
import { api } from "../lib/apiClient";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  currentTask: null,
  filters: {
    status: "",
    assignee: "",
    dueBefore: "",
    q: "",
  },
  loading: false,

  fetchTasks: async (projectId, filters = {}) => {
    set({ loading: true });
    try {
      const response = await api.get(
        `/api/projects/${projectId}/tasks`,
        filters
      );
      set({ tasks: response.data, filters, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch tasks");
      throw error;
    }
  },

  fetchTask: async (taskId) => {
    try {
      const response = await api.get(`/api/tasks/${taskId}`);
      set({ currentTask: response.data });
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch task");
      throw error;
    }
  },

  createTask: async (projectId, data) => {
    try {
      const payload = { ...data };
      if (payload.dueDate) {
        try {
          payload.dueDate = new Date(payload.dueDate).toISOString();
        } catch {}
      }
      const response = await api.post(
        `/api/projects/${projectId}/tasks`,
        payload
      );
      set((state) => ({ tasks: [...state.tasks, response.data] }));
      toast.success("Task created");
      return response.data;
    } catch (error) {
      toast.error("Failed to create task");
      throw error;
    }
  },

  updateTask: async (taskId, data) => {
    try {
      const payload = { ...data };
      if (payload.dueDate) {
        try {
          payload.dueDate = new Date(payload.dueDate).toISOString();
        } catch {}
      }
      const response = await api.patch(`/api/tasks/${taskId}`, payload);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === taskId ? response.data : t)),
        currentTask:
          state.currentTask?._id === taskId ? response.data : state.currentTask,
      }));
      toast.success("Task updated");
      return response.data;
    } catch (error) {
      toast.error("Failed to update task");
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== taskId),
        currentTask:
          state.currentTask?._id === taskId ? null : state.currentTask,
      }));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
      throw error;
    }
  },

  moveTaskStatus: async (taskId, newStatus) => {
    // Optimistic update
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === taskId ? { ...t, status: newStatus } : t
      ),
    }));

    try {
      await api.patch(`/api/tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      // Rollback on error
      set({ tasks: previousTasks });
      toast.error("Failed to update task status");
      throw error;
    }
  },

  setFilters: (filters) => {
    set({ filters });
  },
}));
